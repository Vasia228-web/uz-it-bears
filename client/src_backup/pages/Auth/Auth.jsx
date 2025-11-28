// src/components/Auth/Auth.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import styles from "./Auth.module.css";

export default function Auth() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "" // <-- важливо: бекенд чекає поле "name"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState(null);

  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Будь ласка, заповніть email та пароль");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Будь ласка, введіть коректний email");
      return;
    }

    if (formData.password.length < 4) {
      setError("Пароль має містити принаймні 4 символи");
      return;
    }

    if (authMode === 'register' && !formData.name) {
      setError("Будь ласка, введіть ім'я користувача");
      return;
    }

    if (authMode === 'register' && formData.name.length < 3) {
      setError("Ім'я користувача має містити принаймні 3 символи");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await authenticate(
        formData.email,
        formData.password,
        formData.name, // name передається бекенду
        authMode === 'register'
      );

      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Помилка автентифікації:', err);
      setError("Сталася помилка. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!authMode) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <img src="/logo.jpg" alt="logo" className={styles.logo} />
          <h2>Уж ІТ Ведмеді</h2>
          <p>Оберіть дію</p>
          <div className={styles.authButtons}>
            <button className={styles.authButton} onClick={() => setAuthMode('login')}>Увійти</button>
            <button className={styles.authButton} onClick={() => setAuthMode('register')}>Зареєструватися</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src="/logo.jpg" alt="logo" className={styles.logo} />
        <h2>Уж ІТ Ведмеді</h2>
        <p>{authMode === 'register' ? 'Реєстрація' : 'Вхід'}</p>
        <button className={styles.backButton} onClick={() => setAuthMode(null)} disabled={isLoading}>← Назад</button>
        {authMode === 'register' && <div className={styles.infoBanner}>Ласкаво просимо! Створюємо новий акаунт</div>}
        {error && <div className={styles.error}>{error}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} disabled={isLoading} required />
          {authMode === 'register' && (
            <input type="text" name="name" placeholder="Ім'я користувача" value={formData.name} onChange={handleInputChange} disabled={isLoading} required minLength={3} />
          )}
          <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleInputChange} disabled={isLoading} required minLength={6} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? (authMode === 'register' ? "Реєстрація..." : "Вхід...") : (authMode === 'register' ? "Зареєструватися" : "Увійти")}
          </button>
        </form>
      </div>
    </div>
  );
}
