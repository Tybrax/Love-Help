import React, { useEffect, useState, Fragment } from 'react';

export const ChatHistory = () => {

    const [messages, setMessages] = useState('messages will load soon');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        /*GET REQUESTS TO DISPLAY CHAT HISTORY*/
        if (!isLoading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }

    }, [messages])

    return (
        <Fragment>
                { isLoading ? (
                    <div className="mt-3">
                        <h4>USERNAME - TIME</h4>
                        <p>MESSAGE BODY</p>
                    </div>
                ) : (
                    <p>DISPLAY A SPINNER</p>
                )}
        </Fragment>
    )
}
