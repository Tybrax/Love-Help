import React from 'react';
import imageOne from '../../images/img0.jpg';
import imageTwo from '../../images/img1.jpg';

export const Image = ({ type }) => {
    if (type === 'requests') {
        return (
            <img src={imageOne} className="img-fluid" />
        )
    }

}
