import React from 'react';
import { Carousel } from './Carousel';
import {slides} from '/src/components/carouselData.json'
const Content = () => {
    return (
        <div className='mb-10'>
             <Carousel data={slides} />
        </div>
    );
};

export default Content;
