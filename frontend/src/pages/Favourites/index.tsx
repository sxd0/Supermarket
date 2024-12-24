import { useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router";
import FavouriteHook from "../../hooks/favourites";

const Favourites = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const { deleteCard, favourite, fetchFavourites, page } = FavouriteHook();

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

  useEffect(() => {
    if (!user) navigate("/profile");

    fetchFavourites();
  }, []);

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />

      <h2 className={styles.title}>Избранное</h2>

      {page?.length ? (
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
                  <button
                    className={styles.favourite__button}
                    onClick={() => deleteCard(item)}
                  >
                    Удалить
                  </button>
                </div>
              ) : (
                <h3 className={styles.title}>Загрузка избранных товаров</h3>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h3 className={styles.title}>Список избранного пуст</h3>
      )}
    </div>
  );
};

export default Favourites;
