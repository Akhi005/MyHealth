import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'; // Correct import for the icon
import React from 'react';

const About = () => {
    return (
        <div className="text-white relative mt-72">
            <img src="https://i.ibb.co/hyNqSjT/abut.jpg" className=' h-[380px] w-full' />
            <div className='relative  mt-[-400px] pb-4'>
            <h1 className="relative text-center py-5 text-6xl">About Us</h1>
            <p className="text-center text-lg mb-10">Our Mission</p>
            
            <div className=" ml-24 flex justify-center pb-12 text-2xl text-yellow-200">
                <ul className="mr-16 space-y-2">
                    <li>
                        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /> Commitment to Patients
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /> High Quality Treatment
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /> Patient-Centered Care
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /> Reasonable Cost
                    </li>
                </ul>
                
                <ul className="space-y-2">
                    <li>
                        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /> Community Engagement
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /> Clinical Excellence & Expert Diagnosis
                    </li>
                    
                    <li>
                        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /> Research and Development
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" /> Dedication towards our Staff
                    </li>
                </ul>
            </div>
            </div>
        </div>
    );
};

export default About;
