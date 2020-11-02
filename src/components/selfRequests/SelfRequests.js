/*
1. create two accordions with a clickable picture
2. the first accordion will display informations about the current user's request
3. the second accordion will display informations about volunteering
4. create a panel to update or delete a request
5. create a panel to stop volunteering a given request
6. create a header
7. create a personal request count
*/

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MyRequests } from './MyRequests';
import { Volunteering } from './Volunteering';
import { Header } from './Header';
import { ActivityCount } from './ActivityCount';

export const SelfRequests = () => {
    return (
        <Container fluid>
            <Header />
            <ActivityCount />
            <MyRequests />
        </Container>
    )
}
