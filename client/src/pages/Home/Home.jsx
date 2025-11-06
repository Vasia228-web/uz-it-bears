import styles from "./Home.module.css"


export default function Home(){
    return(
        <div className={styles.container}>
            <div className={styles.newsFeed}>
                <h2>Стрічка новин</h2>
                <div className={styles.post}>
                    <h3>Іван Карпатський</h3>
                    <p>Щойно завершив свій перший fullstack проєкт</p>
                    <img
                        src="img.avif"
                        alt="АІ робот"
                        className={styles.postImage}
                    />
                    <div className={styles.postActions}>
                        <button>❤️ 89</button>
                        <button>💬 34</button>
                        <button>✉️ Поділитись</button>
                    </div>
                </div>
            </div>
            <section className={styles.teamSection}>
                <div>
                    <h2>Створи свою команду!</h2>
                </div>
                <button className={styles.createTeamBtn}>
                    Створити команду
                </button>
            </section>
        </div>
    );
}