import { useState } from 'react';
import styles from './Ranking.module.css';
import { useRanking } from '../../hooks/useRanking';

export default function Ranking() {
    const { rankings, friendsRankings, loading, error } = useRanking();
    const [activeTab, setActiveTab] = useState('all');

    if (loading) return <div className={styles.loading}>Завантаження...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

 
    const displayData = activeTab === 'friends' ? friendsRankings : rankings;

    return (
        <div className={styles.container}>
           
            <div className={styles.header}>
                <h1>Таблиця рангів</h1>
                <p>Найкращі гравці та команди спільноти</p>
            </div>

            
            <div className={styles.tabs}>
                <button 
                    className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    Всі
                </button>
                <button 
                    className={`${styles.tab} ${activeTab === 'friends' ? styles.active : ''}`}
                    onClick={() => setActiveTab('friends')}
                >
                    Друзі ({friendsRankings.length})
                </button>
            </div>


            {activeTab === 'friends' && friendsRankings.length === 0 && (
                <div className={styles.emptyState}>
                    <p>У вас поки що немає друзів у рейтингу</p>
                    <small>Додайте друзів, щоб бачити їх тут</small>
                </div>
            )}

           
            <div className={styles.rankingList}>
                {displayData.map((item, index) => (
                    <RankingItem 
                        key={item.id}
                        item={item}
                        position={index + 1}
                        isFriend={activeTab === 'friends'}
                    />
                ))}
            </div>
        </div>
    );
}

function RankingItem({ item, position, isFriend }) {
    return (
        <div className={`${styles.rankingItem} ${isFriend ? styles.friendItem : ''}`}>
            <div className={styles.position}>#{position}</div>
            
            <div className={styles.avatar}>
                <img src={item.avatar} alt={item.name} />
                {item.type === 'team' && <span className={styles.teamBadge}>Команда</span>}
                {isFriend && <span className={styles.friendBadge}>👥 Друг</span>}
            </div>

            <div className={styles.info}>
                <h3>{item.name}</h3>
                <div className={styles.details}>
                    <span>Рівень {item.level}</span>
                    {item.projects > 0 && <span>{item.projects} проєктів</span>}
                </div>
            </div>

            <div className={styles.points}>{item.points} балів</div>
        </div>
    );
}