import React, { useState, useEffect, Fragment } from 'react';
import { SendBox } from './SendBox.js';
import axios from 'axios';
import { Message } from './Message';
import { filterMessages } from '../../utils/filterMessages';
import { Container } from 'react-bootstrap';
import image from '../../images/img0.jpg'

const getMessages = `${process.env.REACT_APP_BASE_URL}/messages`;

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
        let mounted = true;
        const request = axios.get(getMessages, config);
        request.then((response) => {
            if (mounted) {
                const newArr = Array.prototype.slice.call(response.data);
                const filteredMessages = filterMessages(chatId, newArr);
                const ArrayFromArrayLikeObject = Array.prototype.slice.call(filteredMessages);
                setMessages(ArrayFromArrayLikeObject);
            }

        })
        .catch((error) => {
            setMessagesHaveErrors(true);
        })
        return () => mounted = false;
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
                            time={message.created_at}
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
            <Container className="chats">
                <figure className="text-center">
                    <figcaption className="pt-3 mb-3 messages__header">
                        <h2>Check out your messages</h2>
                    </figcaption>
                    <img src={image} width="600px" className="img-fluid"/>
                </figure>
            </Container>
        )

    }

}
