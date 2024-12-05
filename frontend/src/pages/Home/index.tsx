import { useEffect, useState } from "react";
import MainSlider from "../../components/MainSlider";
import SliderWithNew from "../../components/SliderWithNew/index";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, isSetLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/card", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCards(data);
          isSetLoading(true);
        }
      } catch (error) {
        console.log("Ошибка получения карточек: ", error);
        isSetLoading(false);
      }
    };

    fetchCards();
  }, []);

  return (
    <div>
      <MainSlider />
      <SliderWithNew />

      <section className={styles.sales}>
        <h2 className={styles.sales__title}>Скидки</h2>
        {isLoading ? (
          <div className={styles.cards}>
            {cards.map(
              (item) =>
                item.sale && (
                  <div key={item.id} className={styles.card}>
                    <img
                      className={styles.card__img}
                      src="https://i.pinimg.com/736x/62/c2/91/62c291988428eb4fd629b54f11da89eb.jpg"
                      alt="photo sale"
                    />
                    <p className={styles.card__title}>{item.title}</p>
                    <p className={styles.card__description}>
                      {item.description}
                    </p>
                    <p className={styles.card__price}>
                      {item.price * 100} ₽ - {item.quantity} шт.
                    </p>
                  </div>
                )
            )}
          </div>
        ) : (
          <h3 className={styles.sales__title}>Загрузка скидок...</h3>
        )}
      </section>
    </div>
  );
};

export default Home;
