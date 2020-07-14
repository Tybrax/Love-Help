import React, { useState } from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';

export const SessionStatus = () => {
    const [user, setUser] = useState(false);

    /*GET method to retrieve the user name given a token to write below*/

    setTimeout(() => {
        axios.get('http://localhost:3001/api/v1/users/1')
        .then((response) => {
            setUser(`${response.data.firstName} ${response.data.lastName}`);
            console.log(response.data);
        })
    }, 200)

    if (!user) {
        return (
            <div>
                <h6 className="session-info text-right mr-5 mb-5">Welcome <span style={{color: '#086F00'}} className="font-weight-bold">guest</span>, please login or sign up.</h6>
            </div>
        )
    } else {
        return (
            <div>
                <h6 className="session-info text-right mr-5">Welcome <span style={{color: '#086F00'}} className="font-weight-bold">{user}</span></h6>
            </div>
        )
    }
};

