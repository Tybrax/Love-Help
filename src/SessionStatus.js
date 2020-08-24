import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

export const SessionStatus = () => {
    const {user, setUser} = useContext(UserContext);

    const titleColor = {
        color: '#086F00'
    };

    if (!user) {
        return (
            <div>
                <h6 className="session-info text-right mr-5 mb-5">Welcome on <span style={titleColor} className="font-weight-bold">LOVE & HELP</span>, please login or sign up.</h6>
            </div>
        )
    } else {
        return (
            <div>
                <h6 className="session-info text-right mr-5">Welcome <span style={titleColor} className="font-weight-bold">{user.username}, check out the latest requests</span></h6>
            </div>
        )
    }
};

