import { useEffect, useState } from "react";
import MainSlider from "../../components/MainSlider";
import SliderWithNew from "../../components/SliderWithNew/index";
import styles from "./index.module.scss";
import ProductCard from "../../components/ProductCard";
import HomeHook from "../../hooks/home";

const Home = () => {
  const [limitSale, setLimitSale] = useState<number>(8);
  const [limitPopular, setLimitPopular] = useState<number>(8);

  const {
    cardSales,
    cardPopulars,
    isLoadingSale,
    isLoadingPopular,
    fetchCardSales,
    fetchCardPopulars,
  } = HomeHook();

  useEffect(() => {
    fetchCardSales(limitSale);
  }, [limitSale]);

  useEffect(() => {
    fetchCardPopulars(limitPopular);
  }, [limitPopular]);

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
