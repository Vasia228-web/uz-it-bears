import { useState, useEffect } from 'react';
import { rankingAPI, pointsSystem } from '../data/rankingData';

export function useRanking() {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    const loadRankings = async () => {
        try {
            setLoading(true);
           
            const data = rankingAPI.getAllRankings();
            setRankings(data);
            

            
        } catch (err) {
            setError('Помилка завантаження рейтингів');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const updateUserPoints = async (userId, action) => {
        try {
            const user = rankingAPI.getUserRanking(userId);
            if (user && pointsSystem[action]) {
                const newPoints = user.points + pointsSystem[action];
                const updatedUser = rankingAPI.updatePoints(userId, newPoints);
                

                setRankings(prev => 
                    prev.map(item => 
                        item.id === userId ? updatedUser : item
                    ).sort((a, b) => b.points - a.points)
                );
                
                return updatedUser;
            }
        } catch (err) {
            setError('Помилка оновлення балів');
            throw err;
        }
    };

    useEffect(() => {
        loadRankings();
    }, []);

    return {
        rankings,
        loading,
        error,
        updateUserPoints,
        refreshRankings: loadRankings,
        pointsSystem
    };
}