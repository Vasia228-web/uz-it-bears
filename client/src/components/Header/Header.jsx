import styles from "./Header.module.css"
import { useNavigate } from "react-router-dom"

export default function Header(){
    const navigate = useNavigate();

    const handleNavigation = (page) => {
        navigate(`/${page}`);
    };

    return(
        <header className={styles.header}>
            <h1 
                className={styles.logo}
                onClick={() => handleNavigation('')}
            >
                Уж ІТ Ведмеді
            </h1>
            <nav className={styles.nav}>
                <button 
                    className={styles.navButton}
                    onClick={() => handleNavigation('')}
                >
                    Головна
                </button>
                <button 
                    className={styles.navButton}
                    onClick={() => handleNavigation('chat')}
                >
                    Чати
                </button>
                <button 
                    className={styles.navButton}
                    onClick={() => handleNavigation('projects')}
                >
                    Проєкт
                </button>
                <button 
                    className={styles.navButton}
                    onClick={() => handleNavigation('ranking')}
                >
                    Ранг
                </button>
            </nav>
            <div className={styles.userProfile}>
                <img 
                    src="user.png" 
                    alt="Користувач" 
                    className={styles.userImage}
                    onClick={() => handleNavigation('profile')}
                />
                <button 
                    className={styles.userButton}
                    onClick={() => handleNavigation('profile')}
                >
                    Користувач
                </button>
            </div>
        </header>
    )
}