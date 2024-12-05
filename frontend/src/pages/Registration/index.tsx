import { useState } from "react";
import styles from "./index.module.scss";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useNavigate } from "react-router";

const Registration = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navaigate = useNavigate();

  const fetchLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8080/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (response.ok) {
        navaigate("/profile");
        console.log("Пользователь зарегистрирован");
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
      link: "/profile",
    },
    {
      id: 3,
      title: "Регистрация",
      link: "#",
    },
  ];

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <section className={styles.wrapper}>
        <form className={styles.registration} onSubmit={fetchLogin}>
          <h2 className={styles.registration__title}>Регистрация</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.registration__input}
            type="text"
            placeholder="Имя"
            required
          />
          <input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={styles.registration__input}
            type="text"
            placeholder="Фамилия"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.registration__input}
            type="email"
            placeholder="Почта"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.registration__input}
            type="password"
            placeholder="Пароль"
            required
          />
          <button className={styles.registration__button} type="submit">
            Зарегистрироваться
          </button>
        </form>
      </section>
    </div>
  );
};

export default Registration;
