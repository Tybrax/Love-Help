import React, { useState } from 'react';
import { SendButton } from './SendButton';

export const NewMessage = () => {

    const [message, setMessage] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsFetching(true);
        /*POST MESSAGE TO API*/
        /*CREATE A FUNCTION IN THE UTILS FOLDER*/
        alert(message);
        setIsFetching(false);
    }

    return (
        <form onSubmit={handleSubmit} className="form-group">
            <input
                className="form-control"
                value={message}
                type="text"
                placeholder="Type your message"
                onChange={handleChange}
            />
            <SendButton />
        </form>
    )
}
