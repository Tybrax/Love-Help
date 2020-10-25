import React, { useState, useEffect, Fragment } from 'react';
import { SendBox } from './SendBox.js';
import axios from 'axios';
import { Message } from './Message';
const getMessages = 'http://localhost:3001/messages';

export const ChatRoom = ({ chatId, display, currentUserId }) => {

    const token = localStorage.getItem('userToken') || null;

    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const [messages, setMessages] = useState([]);
    const [messagesHaveErrors, setMessagesHaveErrors] = useState(false);

    useEffect(() => {
        const request = axios.get(getMessages, config);
        request.then((response) => {
            const newArr = Array.prototype.slice.call(response.data);
            setMessages(newArr);
            console.log(newArr);
        })
        .catch((error) => {
            setMessagesHaveErrors(true);
        })
    }, [messages])

    if (display) {
        return (
            <div className="chats">
                <Fragment>
                    {chatId}
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message.content}
                            authorUserId={message.user_id}
                        />
                    ))}
                    <SendBox
                        chatId={chatId}
                        currentUserId={currentUserId}
                    />
                </Fragment>

            </div>
        )
    } else {
        return (
            <div className="chats">
                NOTHING
            </div>
        )

    }

}
