import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "./Carousel.css";

export const Carousel = ({ data }) => {
    const [slide, setSlide] = useState(0);
    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };

    return (
        <div className="carousel bg-white">
            <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
            {data.map((item, idx) => {
                return (
                    <div key={idx} className={slide === idx ? "slide flex" : "slide slide-hidden"}>
                        <img className="p-4 w-[700px]" src={item.src} />
                        <div>
                            <h1 className="ml-56 mt-12 font-bold text-2xl mb-10">{item.heading}</h1>
                            <div className="p-4"> {item.para}  </div>
                            <button className='bg-yellow-500 text-white p-2 ml-96'>Read More  </button>
                        </div>
                    </div>
                );
            })}
            <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
            <span className="indicators">
                {data.map((_, idx) => {
                    return (
                        <button key={idx} className={ slide === idx ? "indicator" : "indicator indicator-inactive"}
                            onClick={() => setSlide(idx)}></button>
                    );
                })}
            </span>
        </div>
    );
};