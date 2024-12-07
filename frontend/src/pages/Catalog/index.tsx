import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import styles from "./index.module.scss";
import type { Catalog } from "../../Types/catalogType";
import { Card } from "../../Types/cardType";
import ProductCard from "../../components/ProductCard";

const Catalog = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [catalog, setCatalog] = useState<Catalog[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(false);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [catalogId, setCatalogId] = useState(1);

  const fetchCardCatalog = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/card/only/${catalogId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCards(data);
        setIsLoadingCards(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      setIsLoadingCards(false);
    }
  };

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch("http://localhost:8080/category", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCatalog(data);
          setIsLoadingCatalog(true);
        }
      } catch (error) {
        console.log("Ошибка получения каталога: ", error);
        setIsLoadingCatalog(false);
      }
    };

    fetchCatalog();
  }, []);

  useEffect(() => {
    fetchCardCatalog();
  }, [catalogId]);

  const breadCrumbs = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 1,
      title: "Каталог",
      link: "#",
    },
  ];

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />

      <h2 className={styles.title}>Каталог</h2>

      <div className={styles.page}>
        {isLoadingCatalog ? (
          <section className={styles.catalog}>
            {catalog.map((item) => (
              <button
                onClick={() => setCatalogId(item.id)}
                className={styles.catalog__button}
                key={item.id}
              >
                {item.title}
              </button>
            ))}
          </section>
        ) : (
          <h3>Загрузка каталога...</h3>
        )}

        {isLoadingCards ? (
          <section className={styles.cards}>
            {cards.map((item) => (
              <div key={item.id}>
                <ProductCard {...item} />
              </div>
            ))}
          </section>
        ) : (
          <h3>Загрузка карточек...</h3>
        )}
      </div>
    </div>
  );
};

export default Catalog;
