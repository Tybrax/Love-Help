import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { Container } from 'react-bootstrap';

import { MessageTextBox } from './MessageTextBox';

const messagesEndpoint = 'http://localhost:3001/api/v1/messages';

export const MessageContainer = (props) => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get(messagesEndpoint)
        .then((response) => {

            const responseData = response.data;
            const messagesList = [];

            responseData.map((message) => {
                const messageObject = {
                    time: message.time,
                    userName: message.username,
                    content: message.content
                };
                messagesList.push(messageObject);
            })

            setMessages(messagesList);
        })
        .catch((error) => {
            console.log("ERROR IN FETCHING DATA FROM API");
        })
    }, 500)

    return (
        <Container>
            {messages.map((message, index) => (
                <Fragment key={index}>
                    <img
                        className="img-fluid"
                        src={message.requester ? "image_for_requester" : "image_for_helper"}
                        alt={message.requester ? "alt_for_requester" : "alt_for_helper"}
                    />
                    <h4>{message.time}</h4>
                    <h5>{message.userName}</h5>
                    <h5>{message.content}</h5>
                </Fragment>
            ))

            }
            <MessageTextBox message={props.currentMessage} />
        </Container>
    )
}

export default MessageContainer;
