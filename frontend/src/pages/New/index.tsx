import { useEffect } from "react";
import styles from "./index.module.scss";
import ProductCard from "../../components/ProductCard";
import BreadCrumbs from "../../components/BreadCrumbs";
import NewHook from "../../hooks/new";

const New = () => {
  useEffect(() => {
    fetchNewCards();
  }, []);

  const { cards, isLoading, fetchNewCards } = NewHook();

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
      <section className={styles.new}>
        <h2 className={styles.new__title}>Новинки</h2>
        {isLoading ? (
          <div className={styles.cards}>
            {cards.map((item) => (
              <div key={item.id}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.new__title}>Загрузка новинок...</h3>
        )}
      </section>
    </div>
  );
};

export default New;
