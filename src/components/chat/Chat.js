import React, { useState } from 'react';
import axios from 'axios';

import { Container } from 'react-bootstrap';

import { SendButton } from './SendButton.js';
import { MessageTextBox } from './MessageTextBox.js';
import { MessageContainer } from './MessageContainer.js';

export const Chat = () => {

    const [latestMessage, setLatestMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleClick = () => {
        alert("clicked");

    }

    return (
        <Container>
            <MessageContainer />
            <SendButton handleClick={() => handleClick()}/>
        </Container>
    )
}

export default Chat;
