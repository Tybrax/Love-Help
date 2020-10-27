/*25/10

TO DO :
IMPLEMENT LOGIC FOR AUTHOR*/

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { Formik } from 'formik';

export const SendBox = ({ chatId, currentUserId }) => {

    const token = localStorage.getItem('userToken') || null;
    const postMessage = `http://localhost:3001/chat/${chatId}/messages`;
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

    const [message, setMessage] = useState('');

    return (
        <Container className="text-center p-3">
            <Formik
                initialValues={{ message: '' }}

                onSubmit={(values, actions) => {
                    setTimeout(() => {

                        const messageData = {
                            chat_id: chatId,
                            user_id: currentUserId,
                            author: 0,
                            content: values.message
                        };

                        const postRequest = axios.post(postMessage, messageData, config);
                        postRequest.then((response) => {
                            console.log(response.data);
                        })

                        actions.resetForm();
                    }, 400);
                }}
            >
               {({
                 values,
                 errors,
                 touched,
                 handleChange,
                 handleBlur,
                 handleSubmit,
                 isSubmitting,
                }) => (
                 <form onSubmit={handleSubmit}>
                   <input
                     type="text"
                     name="message"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.message}
                   />
                   <button type="submit" disabled={isSubmitting}>
                     Submit
                   </button>
                 </form>
               )}
            </Formik>
        </Container>

    )
}
