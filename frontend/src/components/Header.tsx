import { Link } from "react-router";
import favouriteIcon from "../assets/svg/favourite.svg";
import profileIcon from "../assets/svg/profile.svg";
import cartIcon from "../assets/svg/cart.svg";
import { ReactSVG } from "react-svg";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <p className="header__title">AllSad</p>

        <section className="header__section">
          <Link to="/home" className="header__section--button">
            <p>Женщинам</p>
          </Link>
          <Link to="/home" className="header__section--button">
            <p>Мужчинам</p>
          </Link>
          <Link to="/home" className="header__section--button">
            <p>Новинки</p>
          </Link>
          <Link to="/home" className="header__section--button">
            <p>О нас</p>
          </Link>
        </section>

        <section className="header__buttons">
          <Link to="/home">
            <ReactSVG src={favouriteIcon} className="icon" />
          </Link>
          <Link to="/home">
            <ReactSVG src={profileIcon} className="icon" />
          </Link>
          <Link to="/home">
            <ReactSVG src={cartIcon} className="icon" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Header;
