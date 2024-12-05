import { useEffect, useState } from "react";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";
import ProductCard from "../../components/ProductCard";
import BreadCrumbs from "../../components/BreadCrumbs";

const New = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, isSetLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/card/new/", {
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

  const breadCrumbs = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 2,
      title: "Новинки",
      link: "/",
    },
  ];

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <section className={styles.sales}>
        <h2 className={styles.sales__title}>Новинки</h2>
        {isLoading ? (
          <div className={styles.cards}>
            {cards.map((item) => (
              <div key={item.id}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.sales__title}>Загрузка новинок...</h3>
        )}
      </section>
    </div>
  );
};

export default New;
