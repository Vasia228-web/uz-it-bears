import styles from "./Registration.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/logo.jpg" alt="logo" className={styles.logo} />
        <h2>Уж ІТ Ведмеді</h2>
        <p>Реєстрація</p>
        <form className={styles.form}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="repeate password" placeholder="Repeate Password" />
            <input type="user name" placeholder="User Name" />
          <button type="submit">Зареєструватися</button>
        </form>
      </div>
    </div>
  );
}