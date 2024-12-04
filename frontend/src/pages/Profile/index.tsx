import { useState } from "react";
import styles from "./index.module.scss";
import BreadCrumbs from "../../components/BreadCrumbs";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      if (response) {
        const data = response.json();
        console.log("Вход пользователя: ", data);
        fetchCards();
      }
    } catch (error) {
      console.log("Ошибка входа пользователя: ", error);
    }
  };

  const fetchCards = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/card", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response) console.log("Полученные карточки: ", response.json());
    } catch (error) {
      console.log("Ошибка получения данных: ", error);
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
      <form className={styles.profile} onSubmit={fetchLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.profile__input}
          type="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.profile__input}
          type="password"
        />
        <button className={styles.profile__button} type="submit">
          ОТПРАВИТЬ
        </button>
      </form>
    </div>
  );
};

export default Profile;
