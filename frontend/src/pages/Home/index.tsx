import { useEffect, useState } from "react";
import MainSlider from "../../components/MainSlider";
import SliderWithNew from "../../components/SliderWithNew/index";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";
import ProductCard from "../../components/ProductCard";

const Home = () => {
  const [cardSales, setCardSales] = useState<Card[]>([]);
  const [cardPopulars, setCardPopulars] = useState<Card[]>([]);

  const [isLoadingSale, isSetLoadingSale] = useState(false);
  const [isLoadingPopular, isSetLoadingPopular] = useState(false);

  const [limitSale, setLimitSale] = useState<number>(8);
  const [limitPopular, setLimitPopular] = useState<number>(8);

  const fetchCardSales = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/card/sale?skip=0&limit=${limitSale}`,
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
        setCardSales(data);
        isSetLoadingSale(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      isSetLoadingSale(false);
    }
  };

  const fetchCardPopulars = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8080/card/popular?skip=0&limit=${limitPopular}`,
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
        setCardPopulars(data);
        isSetLoadingPopular(true);
      }
    } catch (error) {
      console.log("Ошибка получения карточек: ", error);
      isSetLoadingPopular(false);
    }
  };

  useEffect(() => {
    fetchCardSales();
    fetchCardPopulars();
  }, []);

  return (
    <div>
      <MainSlider />
      <SliderWithNew />

      <section className={styles.sales}>
        <h2 className={styles.sales__title}>Скидки</h2>
        {isLoadingSale ? (
          <div className={styles.cards}>
            {cardSales.map((item) => (
              <div key={item.id}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.sales__title}>
            Загрузка товаров со скидками...
          </h3>
        )}
        <button
          onClick={() => {
            setLimitSale((prevLimit) => prevLimit + 8);
            fetchCardSales();
          }}
          className={styles.sales__button}
        >
          Просмотреть еще
        </button>
      </section>

      <section className={styles.popular}>
        <h2 className={styles.popular__title}>Популярные товары</h2>
        {isLoadingPopular ? (
          <div className={styles.cards}>
            {cardPopulars.map((item) => (
              <div key={item.id}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.sales__title}>
            Загрузка популярных товаров...
          </h3>
        )}
        <button
          onClick={() => {
            setLimitPopular((prevLimit) => prevLimit + 8);
            fetchCardPopulars();
          }}
          className={styles.sales__button}
        >
          Просмотреть еще
        </button>
      </section>
    </div>
  );
};

export default Home;
