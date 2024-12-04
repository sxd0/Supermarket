import { Link } from "react-router";
import favouriteIcon from "../../assets/svg/favourite.svg";
import profileIcon from "../../assets/svg/profile.svg";
import cartIcon from "../../assets/svg/cart.svg";
import { ReactSVG } from "react-svg";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link to="/" className={styles.header__button}>
        <p className={styles.header__title}>AllSad</p>
        </Link>

        <section className={styles.header__section}>
          <Link to="/" className={styles.header__button}>
            <p>Женщинам</p>
          </Link>
          <Link to="/" className={styles.header__button}>
            <p>Мужчинам</p>
          </Link>
          <Link to="/new" className={styles.header__button}>
            <p>Новинки</p>
          </Link>
          <Link to="/about" className={styles.header__button}>
            <p>О нас</p>
          </Link>
        </section>

        <section className={styles.header__buttons}>
          <Link to="/">
            <ReactSVG src={favouriteIcon} className={styles.icon} />
          </Link>
          <Link to="/profile">
            <ReactSVG src={profileIcon} className={styles.icon} />
          </Link>
          <Link to="/cart">
            <ReactSVG src={cartIcon} className={styles.icon} />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Header;
