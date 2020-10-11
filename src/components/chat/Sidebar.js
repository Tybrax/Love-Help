import React, { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { getConversations } from '../../utils/getConversations';
import { getUserInformation } from '../../utils/getUserInformation';

export const Sidebar = () => {

    const token = localStorage.getItem('userToken') || null;

    /*STATE*/
    const [data, setData] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [conversationsError, setConversationsError] = useState(false);
    const [names, setNames] = useState([]);

    /*LIFECYCLE*/
    useEffect(() => {
        setTimeout(() => {
        const promise = getConversations(token);
            promise.then((response) => {
                /*FILTER MESSAGES FOR CURRENT_USER_ID*/

                const allData = [];
                const allUsersID = [];


                response.data.map((messageData) => {
                    allData.push(messageData);
                })

                allData.map((messageData) => {
                    allUsersID.push(messageData.user_id);
                })

                setData(allData);


                const allNames = getUserInformation(allUsersID);
                /*FIX HERE TO UPDATE STATE*/
                console.log(allNames);
                setNames(allNames);
                setHasLoaded(true);
            })
            .catch((error) => {
                console.log(error);
                setConversationsError(true);
            })
        }, 1000)
    })

    return (
        <div className="conversations">
            <h2 className="text-center mb-3">CONVERSATIONS</h2>
            { conversationsError ? (
                <Alert variant="danger" className="alert-fail text-center mt-3">
                    <h4>Can't load conversations from server.</h4>
                </Alert>
            ) : (
                <Container className="mt-3 mb-3 conversation border rounded">
                    {data.map((message) => (
                        <div>
                            <h3>{message.user_id}</h3>
                        </div>
                    ))}
                </Container>
            )}
        </div>

    )
}
