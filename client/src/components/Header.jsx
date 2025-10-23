import styles from "./Header.module.css"

export default function Header(){
    return(
        <header className={styles.header}>
            <h1>Уж ІТ Ведмеді</h1>
            <nav className={styles.nav}>
                <a href="#">Головна</a>
                <a href="#">Чати</a>
                <a href="#">Проєкт</a>
                <a href="#">Ранг</a>
                <a href="#">Події</a>

            </nav>
    <div className={styles.userProfile}>
        <img src="user.png" className={styles.userImage}/>
        <span className={styles.username}>Користувач</span>
    </div>
        </header>

    )
}