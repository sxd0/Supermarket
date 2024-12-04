import Slider from "react-slick";
import styles from "./index.module.scss";

const SwipeToSlide = () => {
  const settings = {
    infinite: true,
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const items = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/62/c2/91/62c291988428eb4fd629b54f11da89eb.jpg",
      title: "Серая юбка",
      price: "15990 ₽",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/b4/ec/c6/b4ecc617e16659875b3506794b29dc84.jpg",
      title: "Жакет из твида",
      price: "12990 ₽",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/6d/d6/c7/6dd6c7a70ca92aa4bba0f89a1713f642.jpg",
      title: "Спортивный костюм",
      price: "22990 ₽",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/16/bb/7d/16bb7d6f9fca0e671fd7d4d0d8f3d6d0.jpg",
      title: "Черное платье",
      price: "13990 ₽",
    },
  ];

  return (
    <div className={styles.sliderContainer}>
      <h2>Новинки</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.price}>{item.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SwipeToSlide;
