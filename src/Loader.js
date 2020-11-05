import React from 'react';
import ReactLoading from 'react-loading';

export const Loader = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);

