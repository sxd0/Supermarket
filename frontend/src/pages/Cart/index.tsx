import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import axios from "axios";
import { CartList } from "../../Types/cartType";
import { useNavigate } from "react-router";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";

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

      {cart ? (
        <div className={styles.cart}>
          {cart.map((item) => (
            <div key={item.id}>
              {cards[item.card_id] ? (
                <div className={styles.product}>
                  <div className={styles.product__section}>
                    <img
                      className={styles.product__image}
                      src={cards[item.card_id].image}
                      alt={`image_${item.card_id}`}
                    />
                    <p className={styles.product__title}>
                      {cards[item.card_id].title}
                    </p>
                    <p className={styles.product__price}>
                      {cards[item.card_id].price} ₽
                    </p>
                  </div>

                  <p className={styles.product__quantity}>
                    Количество: {item.quantity}
                  </p>
                </div>
              ) : (
                <h3>Загрузка товаров</h3>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h1>Ваша корзина пуста</h1>
      )}
    </div>
  );
};

export default Cart;
