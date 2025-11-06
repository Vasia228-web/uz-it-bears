import styles from "./Login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/logo.jpg" alt="logo" className={styles.logo} />
        <h2>Уж ІТ Ведмеді</h2>
        <p>Вхід</p>
        <form className={styles.form}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Увійти</button>
        </form>
      </div>
    </div>
  );
}