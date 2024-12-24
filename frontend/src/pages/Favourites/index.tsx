import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { Card } from "../../Types/cardType";

const Favourites = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const [page, setPage] = useState<number[] | null>(null);
  const [favourite, setFavourite] = useState<{ [key: number]: Card }>({});

  const breadCrumbs = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 2,
      title: "Избранное",
      link: "#",
    },
  ];

  const fetchCard = async (id: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/card/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setFavourite((item) => ({
          ...item,
          [id]: response.data,
        }));
      }
    } catch (error) {
      console.log("Ошибка получения карточки", error);
    }
  };

  const deleteCard = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8080/auth/favourites/remove?favourite=${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        fetchFavourites();
      }
    } catch (error) {
      console.log("Ошибка получения карточки", error);
    }
  };

  const fetchFavourites = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/auth/favoutires",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPage(response.data);
        response.data.forEach((item: number) => {
          fetchCard(item);
        });
      }
    } catch (error) {
      console.log("Ошибка получения корзины", error);
    }
  };

  useEffect(() => {
    if (!user) navigate("/profile");

    fetchFavourites();
  }, []);

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />

      <h2 className={styles.title}>Избранное</h2>

      {page ? (
        <div className={styles.favourites}>
          {page.map((item) => (
            <div key={item}>
              {favourite[item] ? (
                <div className={styles.favourite}>
                  <Link to={`/card/${item}`} className={styles.section}>
                    <img
                      className={styles.favourite__image}
                      src={favourite[item].image}
                      alt={`image_${item}`}
                    />
                    <p className={styles.favourite__title}>
                      {favourite[item].title}
                    </p>
                  </Link>
                  <button onClick={() => deleteCard(item)}>Удалить</button>
                </div>
              ) : (
                <h3>Загрузка избранных товаров</h3>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h2>Список избранного пуст</h2>
      )}
    </div>
  );
};

export default Favourites;
