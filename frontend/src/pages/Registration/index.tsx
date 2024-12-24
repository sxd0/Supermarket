import { useState } from "react";
import styles from "./index.module.scss";
import BreadCrumbs from "../../components/BreadCrumbs";
import { postRegistration } from "../../hooks/registration";

const Registration = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    await postRegistration(e, name, surname, email, password);
  };

  return (
    <div>
      <BreadCrumbs items={breadCrumbs} />
      <section className={styles.wrapper}>
        <form className={styles.registration} onSubmit={handleSubmit}>
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
