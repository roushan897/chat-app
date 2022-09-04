import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';

import {query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import SendMessage from './SendMessage';

const style = {
    main: `flex flex-col p-[10px] overflow-scroll b-[2px]`
}

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    useEffect(()=> {
        const q = query(collection(db, "messages"), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot)=> {
            let messages = [];
            querySnapshot.forEach((doc)=> {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages);
        });

        return () => unsubscribe();
    }, []);

  return (
    <>
     <div className={`${style.main}`}>
        {messages && messages.map((message)=> (
            <Message key={message.id} message={message} /> 
        ))}
     </div>
     {/* Send Message Component */}
     <span ref={scroll}>
        <SendMessage scroll={scroll}/>
     </span>
    </>
  )
}

export default Chat
