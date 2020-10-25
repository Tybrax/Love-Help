import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Alert, Button } from 'react-bootstrap';
import { getConversations } from '../../utils/getConversations';
import { getUserInformation } from '../../utils/getUserInformation';
import { getUser } from '../../utils/getChats';
import { decodeToken } from '../../utils/decodeToken';

const getChats = 'http://localhost:3001/chats';


export const Sidebar = ({ handleClick }) => {

    /*VARIABLES*/
    const token = localStorage.getItem('userToken') || null;
    const currentUserId = decodeToken(token).user_id;

    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    /*Errors*/
    const [chatsError, setChatsError] = useState(false);
    const [volunteersError, setVolunteersError] = useState(false);
    const [userError, setUserError] = useState(false);

    /*Conversations*/
    const [conversations, setConversations] = useState([]);
    const [person, setPerson] = useState('');

    useEffect(() => {
        if (token && currentUserId) {
            axios.get(getChats, config)
            .then((response) => {
                const chats = [];
                for (const data of response.data) {
                    const chatData = data;
                    const chat = {
                        chatId: chatData.id,
                        requesterId: chatData.user_id
                    }
                    const getUserFromVolunteer = `http://localhost:3001/volunteer/${chatData.volunteer_id}`;
                    axios.get(getUserFromVolunteer, config)
                    .then((response) => {
                        const userIdFromVolunteer = response.data.user_id;
                        chat.volunteerUserId = userIdFromVolunteer;
                        if (currentUserId === chat.requesterId) {
                            axios.get(`http://localhost:3001/user/${userIdFromVolunteer}`)
                            .then((response) => {
                                const fullName = `${response.data.first_name} ${response.data.last_name}`;
                                chat.fullName = fullName
                                chats.push(chat);
                                const newArr = Array.prototype.slice.call(chats);
                                setConversations(newArr);
                                setPerson("volunteer");
                            })
                            .catch((error) => {
                                setUserError(true);
                            })
                        } else if (currentUserId === userIdFromVolunteer) {
                            axios.get(`http://localhost:3001/user/${chat.requesterId}`)
                            .then((response) => {
                                const fullName = `${response.data.first_name} ${response.data.last_name}`;
                                chat.fullName = fullName;
                                chats.push(chat);
                                const newArr = Array.prototype.slice.call(chats);
                                setConversations(newArr);
                                setPerson("requester");
                            })
                            .catch((error) => {
                                setUserError(true);
                            })
                        }
                    })
                    .catch((error) => {
                        setVolunteersError(true);
                    })
                }
            })
            .catch((error) => {
                setChatsError(true);
            })
        } else {
            setChatsError(true);
        }
    }, [])

    if (volunteersError || chatsError || userError) {
        return (
            <Alert variant="danger" className="alert-fail text-center mt-3">
                <h4>Can't load conversations from server.</h4>
            </Alert>
        )
    } else {
        return (
        <Container className="conversations">
            {conversations.map((chat) => (
                <Container key={chat.chatId} className="conversation" onClick={() => handleClick(chat.chatId)}>
                    <h5 className="conversation__person">{chat.fullName}</h5>
                </Container>
            ))}
        </Container>
        )
    }
}
