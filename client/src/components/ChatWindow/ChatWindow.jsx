import styles from './ChatWindow.module.css';

export default function ChatWindow({activeChatId,chatsData}){
    // activeChat ми робимо для того щоб показати який чат зараз відкритий
    const activeChat = chatsData.find(chat => chat.id === activeChatId);
    if (!activeChat) {
        return(
            <div className={styles.ChatWindow}>
                <h3>Оберіть чат</h3>
                <p>Виберіть розмову зі списку</p>
            </div>
        );
    }

 

    if(!activeChat) return <div>Чат не знайдено</div>

    return(
        <div className={styles.ChatWindow}>
            <h2>{activeChat.chatName}</h2>
        </div>
    );

}
