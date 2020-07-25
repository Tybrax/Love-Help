import React from 'react';

import { Button } from 'react-bootstrap';

export const SendButton = (props) => {
    return (
        <Button onClick={props.handleClick}>SEND</Button>
    )
}

export default SendButton;
