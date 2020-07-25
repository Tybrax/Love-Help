import React, { useState} from 'react';

import { Container } from 'react-bootstrap';

export const MessageTextBox = (props) => {

    const [username, setUserName] = useState("");
    const [currentMessage, setCurrentMessage] = useState("");
    const [message, setMessage] = useState("");



    return (
        <div className="message-input">
            <input
                value={currentMessage}
                onChange={event => setCurrentMessage(event.target.value)}
            />
        </div>
    )
}

export default MessageTextBox;
