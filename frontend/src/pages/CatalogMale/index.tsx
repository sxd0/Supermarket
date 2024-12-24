import { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import styles from "./index.module.scss";
import { CardGender } from "../../Types/cardType";
import ProductCard from "../../components/ProductCard";
import {
  fetchCatalog,
  fetchCardCatalog,
  isLoadingCatalog,
  catalog,
  isLoadingCards,
} from "../../hooks/catalog";
import { cards } from "../../hooks/new";

const CatalogMale = () => {
  const [catalogId, setCatalogId] = useState(1);

  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    fetchCardCatalog(catalogId);
  }, [catalogId]);

  const breadCrumbs = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 2,
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
            {cards.map(
              (item) =>
                item.gender === CardGender.MALE && (
                  <div key={item.id}>
                    <ProductCard {...item} />
                  </div>
                )
            )}
          </section>
        ) : (
          <h3>Загрузка карточек...</h3>
        )}
      </div>
    </div>
  );
};

export default CatalogMale;
