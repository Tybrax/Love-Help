import React from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { Formik } from 'formik';
import { Input } from '@material-ui/core';

export const SendBox = ({ chatId, currentUserId }) => {

    const token = localStorage.getItem('userToken') || null;
    const postMessage = `${process.env.REACT_APP_BASE_URL}/chat/${chatId}/messages`;
    const config = {
        headers: {
            'authorization': `bearer ${token}`
        }
    };

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
                   <hr />
                   <Input
                     className="message__input"
                     type="text"
                     name="message"
                     onChange={handleChange}
                     onBlur={handleBlur}
                     value={values.message}
                   />
                   <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-dark ml-4"
                    >
                     Send
                   </Button>
                 </form>
               )}
            </Formik>
        </Container>

    )
}
