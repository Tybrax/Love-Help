import React, { useState, Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { upload } from '../../utils/upload.js';
import { approval } from '../../utils/approval';
import { Confirmation } from './Confirmation';

export const File = ({ ID, token }) => {

    const [file, setFile] = useState('');
    const [hasError, setHasError] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    const handleSubmit = async (event) => {
        const formData = new FormData();
        formData.append('official', file);
        const promise = await  upload(ID, formData, token);
        promise.then((response) => {
            setIsUpload(true);
            const secondPromise = approval(ID);
            secondPromise.then((response) => {
                setIsApproved(true);
            })
            .catch((error) => {
                if (!hasError) {
                    setHasError(true);
                }
            })
        })
        .catch(
            setHasError(true)
        )
        event.preventDefault();
    }

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    }

    return (
        <Container>
            { isUpload && isApproved ? (
                <Confirmation />
            ) : (
            <Fragment>
                <h4 className="text-center font-weight-bold">Please upload a government ID before using our application</h4>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </Fragment>
            )}
        </Container>
    )
}
