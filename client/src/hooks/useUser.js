import{useState, useEffect} from 'react';
import { userAPI } from '../data/userData';

export function useUser(){
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);


    const loadUser = async() =>{
        try{
            setLoading(true);
            setError(null);
            const data = await userAPI.getUserProfile();
            setUser(data);
        }catch(err){
            setError("Помилка при завантаженні профілю");
            console.error(err);

        }finally{
            setLoading(false);
        }
    };

    useEffect(() =>{
        loadUser();
    },[])

    const updateUser = async(updatedData) =>{
        try{
            setLoading(true);
            const updateUser =await userAPI.updateUserProfile(updatedData);
            setUser(updateUser);
            return updatedUser;
        }catch(err){
            setError('Помилка оновлення профілю');
            throw err;
        }finally{
            setLoading(false);
        }
    };


    const updateStats =async(stats)=>{
        try{
            const updateUser =await userAPI.updateUserStats(stats);
            setUser (updateUser);
            return updatedUser;
        }catch(err){
            setError('Помилка оновлення статистики');
            throw err;
        }
    };

    return{
        user,
        loading,
        error,
        updateUser,
        updateStats,
        refreshUser: loadUser
    };
}