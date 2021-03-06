import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { Container, Alert, Button } from 'react-bootstrap';
import { getConversations } from '../../utils/getConversations';
import { getUserInformation } from '../../utils/getUserInformation';
import { getUser } from '../../utils/getChats';
import { decodeToken } from '../../utils/decodeToken';
import ReactLoading from 'react-loading';
const Conversations = lazy(() => import('./Conversations'));

const Loader = () => (
    <ReactLoading type="balls" color="green" height={'30%'} width={'30%'} className="text-center" />
);

const getChats = `${process.env.REACT_APP_BASE_URL}/chats`;

const Sidebar = ({ handleClick }) => {

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

    useEffect(() => {
        let mounted = true;
        if (token && currentUserId) {
            axios.get(getChats, config)
            .then((response) => {
                if (mounted) {
                    const chats = [];
                    for (const data of response.data) {
                        const chatData = data;
                        const chat = {
                            chatId: chatData.id,
                            requesterId: chatData.user_id
                        }
                        const getUserFromVolunteer = `${process.env.REACT_APP_BASE_URL}/volunteer/${chatData.volunteer_id}`;
                        axios.get(getUserFromVolunteer, config)
                        .then((response) => {
                            if (mounted) {
                            const userIdFromVolunteer = response.data.user_id;
                            chat.volunteerUserId = userIdFromVolunteer;
                            chat.requestId = response.data.request_id;
                            /*Current user is requester, seeking the volunteer*/
                            if (currentUserId === chat.requesterId) {
                                axios.get(`${process.env.REACT_APP_BASE_URL}/user/${userIdFromVolunteer}`)
                                .then((response) => {
                                    if (mounted) {
                                        const fullName = `${response.data.first_name} ${response.data.last_name}`;
                                        chat.fullName = fullName;
                                        axios.get(`${process.env.REACT_APP_BASE_URL}/requests/${chat.requestId}`, config)
                                        .then((response) => {
                                            if (mounted) {
                                                chat.title = response.data.title;
                                                chats.push(chat);
                                                const newArr = Array.prototype.slice.call(chats);
                                                setConversations(newArr);
                                                localStorage.setItem(`${chatData.id}`, fullName);
                                            }
                                        })
                                    }
                                })
                                .catch((error) => {
                                    setUserError(true);
                                })
                            /*Current user is volunteer, seeking the requester*/
                            } else if (currentUserId === userIdFromVolunteer) {
                                axios.get(`${process.env.REACT_APP_BASE_URL}/user/${chat.requesterId}`)
                                .then((response) => {
                                    if (mounted) {
                                        const fullName = `${response.data.first_name} ${response.data.last_name}`;
                                        chat.fullName = fullName;
                                        axios.get(`${process.env.REACT_APP_BASE_URL}/requests/${chat.requestId}`, config)
                                        .then((response) => {
                                            if (mounted) {
                                                chat.title = response.data.title;
                                                chats.push(chat);
                                                const newArr = Array.prototype.slice.call(chats);
                                                setConversations(newArr);
                                                localStorage.setItem(`${chatData.id}`, fullName);
                                            }
                                        })
                                    }
                                })
                                .catch((error) => {
                                    setUserError(true);
                                })
                            }
                        }
                        })
                        .catch((error) => {
                            setVolunteersError(true);
                        })
                    }
                }

            })
            .catch((error) => {
                setChatsError(true);
            })
        } else {
            setChatsError(true);
        }
        return () => mounted = false;
    }, [])

    if (volunteersError || chatsError || userError) {
        return (
            <Alert variant="danger" className="alert-fail text-center mt-3">
                <h4>Can't load conversations from server.</h4>
            </Alert>
        )
    } else {
        return (
            <Suspense fallback={Loader()}>
                <Conversations
                    conversations={conversations}
                    chatsError={chatsError}
                    volunteersError={volunteersError}
                    handleClick={handleClick}
                />
            </Suspense>
        )
    }
}

export default Sidebar;
