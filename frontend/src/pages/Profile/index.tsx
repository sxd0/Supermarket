import React, { useState } from "react";
import styles from "./index.module.scss";
import BreadCrumbs from "../../components/BreadCrumbs";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../../store/slices/userSlice";
import { AppDispatch, RootState } from "../../store/store";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logoutUser());
    setEmail("");
    setPassword("");
  };

  const breadCrumbs = [
    {
      id: 1,
      title: "Главная",
      link: "/",
    },
    {
      id: 2,
      title: "Профиль",
      link: "#",
    },
  ];

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      {!user ? (
        <section className={styles.wrapper}>
          <h2 className={styles.wrapper__title}>Необходимо выполнить вход</h2>
          <form className={styles.profile} onSubmit={handleLogin}>
            <h2 className={styles.profile__title}>Вход</h2>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.profile__input}
              type="email"
              placeholder="Почта"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.profile__input}
              type="password"
              placeholder="Пароль"
              required
            />
            <button className={styles.profile__button} type="submit">
              Войти
            </button>
          </form>

          <div className={styles.registration}>
            <h3 className={styles.registration__title}>У вас нет аккаунта?</h3>
            <Link className={styles.registration__link} to="/registration">
              Зарегистрироваться
            </Link>
          </div>
        </section>
      ) : (
        <div>
          <h2 className={styles.wrapper__title}>Ваше имя: {user?.name}</h2>
          <h2 className={styles.wrapper__title}>
            Ваша фамилия: {user?.surname}
          </h2>
          <button className={styles.wrapper__button} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
