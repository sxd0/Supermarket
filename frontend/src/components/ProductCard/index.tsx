import { Link } from "react-router";
import { Card } from "../../Types/cardType";
import styles from "./index.module.scss";

const ProductCard = (props: Card) => {
  return (
    <Link to={`/card/${props.id}`} key={props.id} className={styles.card}>
      <img
        className={styles.card__img}
        src={props.image}
        alt={`photo_${props.id}`}
      />
      <p className={styles.card__title}>{props.title}</p>
      <p className={styles.card__price}>{props.price} ₽</p>
    </Link>
  );
};

export default ProductCard;
