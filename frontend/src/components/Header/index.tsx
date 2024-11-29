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
        <p className={styles.header__title}>AllSad</p>

        <section className={styles.header__section}>
          <Link to="/home" className={styles.header__button}>
            <p>Женщинам</p>
          </Link>
          <Link to="/home" className={styles.header__button}>
            <p>Мужчинам</p>
          </Link>
          <Link to="/home" className={styles.header__button}>
            <p>Новинки</p>
          </Link>
          <Link to="/home" className={styles.header__button}>
            <p>О нас</p>
          </Link>
        </section>

        <section className={styles.header__buttons}>
          <Link to="/home">
            <ReactSVG src={favouriteIcon} className={styles.icon} />
          </Link>
          <Link to="/home">
            <ReactSVG src={profileIcon} className={styles.icon} />
          </Link>
          <Link to="/home">
            <ReactSVG src={cartIcon} className={styles.icon} />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Header;
