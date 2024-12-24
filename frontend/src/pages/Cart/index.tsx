import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import axios from "axios";
import { CartList } from "../../Types/cartType";
import { Link, useNavigate } from "react-router";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";
import { ReactSVG } from "react-svg";
import addSvg from "../../assets/svg/add.svg";
import deleteSvg from "../../assets/svg/delete.svg";
import cross from "../../assets/svg/cross.svg";

const Cart = () => {
  const [cart, setCart] = useState<CartList[] | null>(null);
  const [cards, setCards] = useState<{ [key: number]: Card }>({});
  const { user } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  const breadCrumbs = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 2,
      title: "Корзина",
      link: "#",
    },
  ];

  const fetchCard = async (id: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8080/card/${id}`, {
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.status === 200) {
        setCards((item) => ({
          ...item,
          [id]: response.data,
        }));
      }
    } catch (error) {
      console.error("Ошибка получения карточки: ", error);
    }
  };

  useEffect(() => {
    if (!user) navigate("/profile");

    const fetchCart = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/cart", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setCart(response.data);
          response.data.forEach((item: CartList) => {
            fetchCard(item.card_id);
          });
        }
      } catch (error) {
        console.log("Ошибка получения корзины", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />

      <h2 className={styles.title}>Корзина</h2>

      {cart?.length ? (
        <div className={styles.cart}>
          {cart.map((item) => (
            <div key={item.id}>
              {cards[item.card_id] ? (
                <div className={styles.product}>
                  <Link
                    to={`/card/${item.card_id}`}
                    className={styles.product__section}
                  >
                    <img
                      className={styles.product__image}
                      src={cards[item.card_id].image}
                      alt={`image_${item.card_id}`}
                    />
                    <div className={styles.product__group}>
                      <p className={styles.product__title}>
                        {cards[item.card_id].title}
                      </p>
                      <p className={styles.product__description}>
                        {cards[item.card_id].description}
                      </p>
                    </div>
                  </Link>

                  <div className={styles.product__cost}>
                    <p className={styles.product__price}>
                      {cards[item.card_id].price * item.quantity} ₽
                    </p>

                    <div className={styles.product__addDelete}>
                      <ReactSVG src={deleteSvg} className={styles.product__icon} />

                      <p className={styles.product__quantity}>
                        {item.quantity}
                      </p>

                      <ReactSVG
                        src={addSvg}
                        className={styles.product__icon}
                      />
                    </div>
                  </div>

                  <ReactSVG src={cross} className={styles.product__cross} />
                </div>
              ) : (
                <h3 className={styles.title}>Загрузка товаров корзины</h3>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h3 className={styles.title}>Ваша корзина пуста</h3>
      )}
    </div>
  );
};

export default Cart;
