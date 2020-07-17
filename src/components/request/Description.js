import React from 'react';
import { requestInformations } from './Map.js';

export const Description = () => {
    return (
        <h1>{requestInformations[0]}</h1>
    )
}

export default Description;
