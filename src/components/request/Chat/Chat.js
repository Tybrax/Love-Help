import React from 'react';

import { ChatHistory } from './ChatHistory';
import { NewMessage } from './NewMessage';

export const Chat = () => {
    return (
        <div>
            <ChatHistory />
            <NewMessage />
        </div>
    )
}
