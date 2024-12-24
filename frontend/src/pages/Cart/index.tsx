import { useEffect } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Link, useNavigate } from "react-router";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";
import { ReactSVG } from "react-svg";
import addSvg from "../../assets/svg/add.svg";
import deleteSvg from "../../assets/svg/delete.svg";
import cross from "../../assets/svg/cross.svg";
import { cart, deleteCard, fetchCart, quantityCard } from "../../hooks/cart";
import { cards } from "../../hooks/new";

const Cart = () => {
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
