import React from 'react';
import { Container } from 'react-bootstrap';
import { Image } from './Image';
import { RequestCard } from './RequestCard';

const Requests = ({ arrayOfRequests, canPublish }) => {
    return (
        <Container>
            {arrayOfRequests.map((request, index) => (
                <RequestCard
                    key={index}
                    requestTitle={request.title}
                    requestDescription={request.description}
                    requestDate={request.created_at}
                    requestType={request.request_type}
                    requestStatus={request.status}
                    requesterId={request.user_id}
                    requestId={request.id}
                    canPublish={canPublish}
                />
            ))}
        </Container>
    )
}

export default Requests;
