import { useState } from "react";
import styles from "./index.module.scss";
import BreadCrumbs from "../../components/BreadCrumbs";
import { User } from "../../Types/authType";
import { Link } from "react-router";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isUser, setIsUser] = useState(false);

  const fetchLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8080/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsUser(true);
        console.log("Вход пользователя: ", data);
      }
    } catch (error) {
      console.log("Ошибка входа пользователя: ", error);
    }
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
      {!isUser ? (
        <section className={styles.wrapper}>
          <h2 className={styles.wrapper__title}>Необходимо выполнить вход</h2>
          <form className={styles.profile} onSubmit={fetchLogin}>
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
        </div>
      )}
    </div>
  );
};

export default Profile;
