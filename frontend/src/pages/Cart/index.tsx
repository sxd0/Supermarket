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

  const deleteCard = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8080/cart?cart_id=${id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCart(
          (prevCart) => prevCart?.filter((item) => item.id !== id) || null
        );
      }
    } catch (error) {
      console.log("Ошибка удаления карточки", error);
    }
  };

  const quantityCard = async (id: number, quantity: number) => {
    if (quantity > 0) {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8080/cart/update_quantity?cart_id=${id}&new_quantity=${quantity}`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setCart(
            (prev) =>
              prev?.map((item) =>
                item.id === id ? { ...item, quantity } : item
              ) || null
          );
        }
      } catch (error) {
        console.log("Ошибка удаления карточки", error);
      }
    }
  };

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

  useEffect(() => {
    if (!user) navigate("/profile");

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
                      <ReactSVG
                        onClick={() => quantityCard(item.id, item.quantity - 1)}
                        src={deleteSvg}
                        className={styles.product__icon}
                      />

                      <p className={styles.product__quantity}>
                        {item.quantity}
                      </p>

                      <ReactSVG
                        onClick={() => quantityCard(item.id, item.quantity + 1)}
                        src={addSvg}
                        className={styles.product__icon}
                      />
                    </div>
                  </div>

                  <ReactSVG
                    onClick={() => deleteCard(item.id)}
                    src={cross}
                    className={styles.product__cross}
                  />
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
