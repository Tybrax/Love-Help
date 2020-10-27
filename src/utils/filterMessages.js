/*
Takes the current user's id, a chat id and an array containing all the messages to filter those messages for the correct chatroom
*/

export const filterMessages = (chatId, arrayOfMessages) => {

    const filteredMessages = [];

    arrayOfMessages.map((message) => {

        if (message.chat_id === chatId) {
            filteredMessages.push(message);
        }

    })

    return filteredMessages;
}
