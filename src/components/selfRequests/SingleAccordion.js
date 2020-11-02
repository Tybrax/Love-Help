import React from 'react';
import { Container, Card, Accordion, Button } from 'react-bootstrap';
import { Image } from './Image';
import { RequestCard } from './RequestCard';

export const SingleAccordion = ({ arrayOfRequests }) => {
    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <Image type="requests"/>
                        <h1 className="accordion__title text-center p-3">Requests</h1>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
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
                            />
                        ))}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}
