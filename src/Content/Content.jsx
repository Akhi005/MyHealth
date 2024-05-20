import React from 'react';
import { slides } from "./carouselData.json";
import { Carousel } from './Carousel';

const Content = () => {
    return (
        <div className='mb-10'>
             <Carousel data={slides} />
            
        </div>
    );
};

export default Content;
