import React from 'react';
import imageOne from '../../images/img0.jpg';
import imageTwo from '../../images/img1.jpg';
import requestBanner from '../../images/banner.png';

export const Image = ({ type }) => {
    if (type === 'requests') {
        return (
            <img src={requestBanner} className="img-fluid" />
        )
    }

}
