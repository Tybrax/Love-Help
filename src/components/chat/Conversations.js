import React from 'react';
import { Container } from 'react-bootstrap';

const Conversations = ({ conversations, chatsError, volunteersError, handleClick }) => {
    return (
        <Container className="conversations">
            {(conversations.length === 0) && (
                <h3 className="text-center">No requests answered yet</h3>
            )}

            {conversations.map((chat) => (
                <Container key={chat.chatId} className="conversation d-block" onClick={() => handleClick(chat.chatId)}>
                    <div>
                        <h5 className="conversation__person p-1">{chat.fullName}</h5>
                    </div>
                    <div>
                        <h5 className="conversation__title p-1">{chat.title}</h5>
                    </div>
                </Container>
            ))}
        </Container>
    )
};

export default Conversations;
