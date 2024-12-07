import { useEffect, useState } from "react";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";
import { useNavigate, useParams } from "react-router";
import BreadCrumbs from "../../components/BreadCrumbs";
import { ReactSVG } from "react-svg";
import favouriteIcon from "../../assets/svg/favourite.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AboutCard = () => {
  const { id } = useParams<string>();
  const [card, setCard] = useState<Card | null>(null);
  const [openSection, setOpenSection] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { user } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8080/card/${id}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCard(data);
          setSelectedImage(
            "https://i.pinimg.com/736x/62/c2/91/62c291988428eb4fd629b54f11da89eb.jpg"
          );
        }
      } catch (error) {
        console.error("Ошибка получения карточки: ", error);
      }
    };

    fetchCard();
  }, [id]);

  const addInCart = () => {
    if (!user) return navigate("/profile");
  };

  const addInFavourite = () => {
    if (!user) return navigate("/profile");
  };

  const toggleSection = (section: string) => {
    setOpenSection((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleImageSelect = () => {
    setSelectedImage(
      "https://i.pinimg.com/736x/62/c2/91/62c291988428eb4fd629b54f11da89eb.jpg"
    );
  };

  const breadCrumbs = [
    { id: 1, title: "Главная", link: "/" },
    { id: 2, title: card?.title || "Товар", link: `/card/${id}` },
  ];

  return (
    <div className={styles.container}>
      <BreadCrumbs items={breadCrumbs} />

      {card ? (
        <div className={styles.product}>
          <div className={styles.gallery}>
            <div className={styles.gallery__thumbnails}>
              <img
                src={selectedImage}
                alt="Small photo"
                className={`${styles.thumbnail} ${
                  selectedImage ===
                  "https://i.pinimg.com/736x/62/c2/91/62c291988428eb4fd629b54f11da89eb.jpg"
                    ? styles.thumbnail__active
                    : ""
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
              <p className={styles.details__price}>{card.price * 100} ₽</p>
            </div>

            <p className={styles.details__description}>{card.description}</p>

            <div className={styles.size}>
              <h3 className={styles.size__title}>
                Доступные размеры для заказа:
              </h3>
              <p className={styles.size__text}>{card.size}</p>
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
        </div>
      ) : (
        <h3 className={styles.loading}>Загрузка страницы...</h3>
      )}
    </div>
  );
};

export default AboutCard;
