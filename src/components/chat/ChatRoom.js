import React, { useState, useEffect, Fragment } from 'react';
import { SendBox } from './SendBox.js';
import axios from 'axios';
import { Message } from './Message';
import { filterMessages } from '../../utils/filterMessages';

const getMessages = 'http://localhost:3001/messages';

const headerStyle = {
    backgroundColor: '#243c22',
    color: 'white',
    fontFamily: 'Vollkorn',
    letterSpacing: '2px'
};

export const ChatRoom = ({ chatId, display, currentUserId }) => {

    const token = localStorage.getItem('userToken') || null;

    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const contactName = localStorage.getItem(`${chatId}`);

    const [messages, setMessages] = useState([]);
    const [messagesHaveErrors, setMessagesHaveErrors] = useState(false);

    useEffect(() => {
        /*Fetch messages*/
        const request = axios.get(getMessages, config);
        request.then((response) => {
            const newArr = Array.prototype.slice.call(response.data);
            const filteredMessages = filterMessages(chatId, newArr);
            const ArrayFromArrayLikeObject = Array.prototype.slice.call(filteredMessages);
            setMessages(ArrayFromArrayLikeObject);
        })
        .catch((error) => {
            setMessagesHaveErrors(true);
        })
    }, [messages])

    if (display && contactName) {
        return (
            <div className="chats mb-5">
                <Fragment>
                    <div style={headerStyle}>
                        <h3 className="text-center p-4">{contactName}</h3>
                    </div>
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message.content}
                            author={(currentUserId == message.user_id) ? 0 : 1}
                        />
                    ))}
                    <SendBox
                        chatId={chatId}
                        currentUserId={currentUserId}
                        className="p-3"
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
