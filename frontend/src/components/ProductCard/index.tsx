import { Link } from "react-router";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";

const ProductCard = (props: Card) => {
  return (
    <Link to={`/card/${props.id}`} key={props.id} className={styles.card}>
      <img
        className={styles.card__img}
        src="https://i.pinimg.com/736x/62/c2/91/62c291988428eb4fd629b54f11da89eb.jpg"
        alt="photo"
      />
      <p className={styles.card__title}>{props.title}</p>
      <p className={styles.card__description}>{props.description}</p>
      <p className={styles.card__price}>{props.price * 100} ₽</p>
    </Link>
  );
};

export default ProductCard;
