import React from 'react';
import { Button } from 'react-bootstrap';

export const LogOut = ({handleClick}) => {
    return (
        <Button
            onClick={handleClick}
            className="btn-dark"
        >
            Log out
        </Button>
    )
}

export default LogOut;
