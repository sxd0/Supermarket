import { useEffect } from "react";
import { CardGender } from "../../Types/cardType";
import styles from "./index.module.scss";
import { useParams } from "react-router";
import BreadCrumbs from "../../components/BreadCrumbs";
import { ReactSVG } from "react-svg";
import favouriteIcon from "../../assets/svg/favourite.svg";
import SuccessfullyAdded from "../../components/SuccessfullyAdded";
import CardHook from "../../hooks/card";

const AboutCard = () => {
  const { id } = useParams<{ id: string }>();

  const {
    setOpenSection,
    setSelectedImage,
    card,
    selectedImage,
    addInCart,
    addInFavourite,
    openSection,
    isVisible,
    isAddedCart,
    fetchCard,
  } = CardHook();

  useEffect(() => {
    id ? fetchCard(id) : null;
  }, [id]);

  const toggleSection = (section: string) => {
    setOpenSection((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleImageSelect = (item: string) => {
    setSelectedImage(item);
  };

  const breadCrumbs = [
    { id: 1, title: "Главная", link: "/" },
    {
      id: 2,
      title:
        card?.gender === CardGender.MALE
          ? "Мужской каталог"
          : "Женский каталог",
      link:
        card?.gender === CardGender.MALE ? "/catalog-male" : "/catalog-female",
    },
    { id: 3, title: card?.title || "Товар", link: `/card/${id}` },
  ];

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />

      {card ? (
        <div className={styles.product}>
          <div className={styles.gallery}>
            <div className={styles.gallery__thumbnails}>
              <img
                src={selectedImage}
                alt="Small photo"
                className={`${styles.thumbnail} ${
                  selectedImage === card.image ? styles.thumbnail__active : ""
                }`}
                onClick={() => handleImageSelect}
              />
            </div>
            <img
              className={styles.gallery__img}
              src={selectedImage}
              alt={card.title}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.details__section}>
              <h1 className={styles.details__title}>{card.title}</h1>
              <p className={styles.details__price}>{card.price} ₽</p>
            </div>

            <p className={styles.details__description}>{card.description}</p>

            <div className={styles.size}>
              <h3 className={styles.size__title}>
                Доступные размеры для заказа:
              </h3>
              <div className={styles.size__section}>
                {card.size.map((item, index) => (
                  <p key={index} className={styles.size__text}>
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className={styles.buttons}>
              <button onClick={addInCart} className={styles.buttons__cart}>
                Добавить в корзину
              </button>
              <ReactSVG
                onClick={addInFavourite}
                src={favouriteIcon}
                className={styles.buttons__icon}
              />
            </div>

            <div className={styles.additional}>
              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("description") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("description")}
                >
                  Описание и состав:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("description") && (
                  <div className={styles.additional__content}>
                    <p>
                      Этот товар изготовлен из высококачественных материалов,
                      обеспечивающих долгий срок службы. Удобен в повседневной
                      носке благодаря современному дизайну и эргономичности.
                      Легко сочетается с другими элементами гардероба. Подходит
                      для всех сезонов.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("delivery") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("delivery")}
                >
                  Доставка:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("delivery") && (
                  <ul className={styles.additional__content}>
                    <li>
                      При заказе на сумму от 20 000 руб. — доставка по России
                      бесплатно.
                    </li>
                    <li>Курьер по Москве и МО за пределы МКАД — 500 руб.</li>
                    <li>Курьер по Санкт-Петербургу — 500 руб.</li>
                    <li>Курьер при доставке в регионы — 790 руб.</li>
                    <li>Доставка в пункты выдачи — от 290 руб.</li>
                    <li>СНГ — от 890 руб.</li>
                  </ul>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("return") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("return")}
                >
                  Возврат:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("return") && (
                  <div className={styles.additional__content}>
                    <p>
                      Если товар вам не подошел, вы можете оформить возврат в
                      течение 14 дней с момента получения заказа.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("care") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("care")}
                >
                  Уход за изделием:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("care") && (
                  <ol className={styles.additional__content}>
                    <li>
                      Ручная стирка при температуре не выше 30℃. Не выкручивать.
                    </li>
                    <li>Не отбеливать.</li>
                    <li>Утюжить при температуре не выше 115℃.</li>
                    <li>Сушить вертикально.</li>
                    <li>Деликатная химчистка.</li>
                  </ol>
                )}
              </div>

              <div>
                <button
                  className={`${styles.additional__title} ${
                    openSection.includes("count") ? styles.open : ""
                  }`}
                  onClick={() => toggleSection("count")}
                >
                  В наличие:
                  <span className={styles.arrow} />
                </button>
                {openSection.includes("count") && (
                  <div className={styles.additional__content}>
                    <p>
                      Успейте заказать, пока все не разобрали, осталось всего -{" "}
                      {card.quantity} штук.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {isVisible && (
            <SuccessfullyAdded itemName={card.title} cart={isAddedCart} />
          )}
        </div>
      ) : (
        <h3 className={styles.loading}>Загрузка страницы...</h3>
      )}
    </div>
  );
};

export default AboutCard;
