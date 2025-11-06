import { useState, useEffect} from 'react';
import { chatsData  } from '../data/chatsData';

export function useChats(){
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    useEffect(() =>{
        setChats(chatsData);
    }, []);

    return {chats, activeChat, setActiveChat}
}