import styles from "./index.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4>О нас</h4>
          <ul>
            <li>О компании</li>
            <li>Отзывы</li>
            <li>Работа у нас</li>
            <li>Блог</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Покупателям</h4>
          <ul>
            <li>Оплата и доставка</li>
            <li>Реквизиты организации</li>
            <li>Подгонка и гарантийный ремонт</li>
            <li>Возврат</li>
            <li>Программа лояльности</li>
            <li>Вопрос-ответ</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Контакты магазинов</h4>
          <ul>
            <li>Контакты</li>
            <li>WhatsApp</li>
            <li>Эл. почта</li>
            <li>Telegram</li>
          </ul>
        </div>
        <div className={styles.newsletter}>
          <h4>Подписка на новости</h4>
          <p>
            Получайте советы стилистов, вдохновляйтесь образами блогеров и
            следите за модой с нами.
          </p>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Введите ваш email" />
            <button>Подписаться</button>
          </div>
          <p className={styles.agreement}>
            Нажимая на кнопку, я соглашаюсь с{" "}
            <a href="#">политикой конфиденциальности</a>, ознакомлен(а) с{" "}
            <a href="#">пользовательским соглашением</a> и{" "}
            <a href="#">условиями программы лояльности</a>.
          </p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2024 ALL SAD</span>
      </div>
    </footer>
  );
};

export default Footer;
