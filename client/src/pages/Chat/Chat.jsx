import styles from "./Chat.module.css"
import { useState } from "react";
import { useChats } from "../../hooks/useChats";
import ChatWindow from "../../components/ChatWindow/ChatWindow";

export default function Chat(){
    const { chats, activeChat, setActiveChat } = useChats();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredChats = chats.filter(chat =>
        chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className={styles.chatLayout}>
            <div className={styles.container}>
               
                <div className={styles.header}>
                    <p>Повідомлення</p>
                </div>

                
                <div className={styles.searchContainer}>
                    <input 
                        type="text"
                        placeholder="Пошук чатів..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

               
                <div className={styles.chatsList}>
                    {filteredChats.map(chat =>(
                        <div 
                            key={chat.id} 
                            onClick={() => setActiveChat(chat.id)}
                            className={`${styles.chatItem} ${activeChat === chat.id ? styles.activeChat : ''}`}
                        >
                            <div className={styles.avatar}>{chat.avatar}</div>
                            <div className={styles.chatContent}>
                                <div className={styles.chatHeader}>
                                    <span className={styles.chatName}>{chat.chatName}</span>
                                    <span className={styles.chatTime}>{chat.time}</span>
                                </div>
                                <p className={styles.lastMessage}>{chat.lastSender}: {chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
           
            <ChatWindow 
                activeChatId={activeChat}
                chatsData={chats}
            />
        </div>  
    );
}