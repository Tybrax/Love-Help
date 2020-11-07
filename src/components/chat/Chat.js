import React, { useState, lazy, Suspense } from 'react'
import { decodeToken } from '../../utils/decodeToken';
import { Container, Col, Row } from 'react-bootstrap';
import { ChatRoom } from './ChatRoom';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';
const Sidebar = lazy(() => import('./Sidebar'));


const Loader = () => (
    <ReactLoading type="balls" color="green" height={'30%'} width={'30%'} className="text-center" />
);

export const Chat = () => {

    const token = localStorage.getItem('userToken') || null;
    const currentUserId = decodeToken(token).user_id || null;

    const [showMessagesBox, setShowMessagesBox] = useState(false);
    const [chatRoom, setChatRoom] = useState();

    const handleClick = (id) => {
        setChatRoom(id);
        if (!showMessagesBox) {
            setShowMessagesBox(true);
        }
    }

    if (token) {
        return (
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={4}>
                        <Suspense fallback={Loader()}>
                            <Sidebar handleClick={handleClick} />
                        </Suspense>
                    </Col>
                    <Col xs={12} sm={12} md={8}>
                        <ChatRoom
                            chatId={chatRoom}
                            display={showMessagesBox}
                            currentUserId={currentUserId}
                        />
                    </Col>
                </Row>
            </Container>
        )
    } else {
        return (
            <Redirect to="/" />
        )
    }
}
