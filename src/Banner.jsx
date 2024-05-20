import React from 'react';

const Banner = () => {
    return (
        <div>
            <img  className='banner-img fixed mx-96 my-30 w-[600px] ' src="https://i.ibb.co/S7FscPd/pic-1.jpg"/>
            <h1 className='relative text-7xl ml-72 mt-24 pt-16 text-gray-500'>Welcome to MyHealth</h1>
            <p className='ml-96 pl-44'>Let's take care of our health</p>
        </div>
    );
};

export default Banner;