import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import "/src/styles/carousel.css";

export const Carousel = ({ data }) => {
    const [slide, setSlide] = useState(0);
    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };

    return (
        <div className="carousel bg-white w-[90vw] ml-20">
            <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
            {data.map((item, idx) => {
                return (
                    <div key={idx} className={slide === idx ? "slide flex" : "slide slide-hidden"}>
                        <img className="p-4 w-[900px]" src={item.src} />
                        <div>
                            <h1 className="w-full text-center mt-12 font-bold text-2xl mb-10">{item.heading}</h1>
                            <div className="p-4 text-xl"> {item.para}  </div>
                           <div className="w-full text-center"> 
                            <button className='bg-yellow-500 text-white p-3 rounded '>Read More </button>
                          </div>
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