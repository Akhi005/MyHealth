import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const Service_Details = () => {
  const location = useLocation();
 
  const data = location.state?.data || [];
  
  if (!data.length) {
    return <ErrorPage/>;
  }
  const content = data[0]; 

  return (
    <div className='ml-5'>
      <h1 className='text-3xl mt-4 mb-8 text-center'>{content.name}</h1>
      <div><strong >Definition:</strong> <p className='bg-yellow-500 m-4 p-4'>{content.definition}</p></div>
      <div><strong>Symptoms:</strong> <p className='bg-yellow-500 m-4 p-4'>{content.symptomps}</p></div>
      <div><strong>Prevention:</strong> <p className='bg-yellow-500 m-4 p-4'>{content.prevent}</p></div>
      <div><strong>Medicine + First Aid:</strong> <p className='bg-yellow-500 m-4 p-4'>{content.medicine}</p></div>
    </div>
  );
};

export default Service_Details;
