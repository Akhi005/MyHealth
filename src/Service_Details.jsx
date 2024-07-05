import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import axios from 'axios';

const Service_Details = () => {
  const { title } = useParams(); 
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchContent = async () => {
      console.log("details ",title);
      try {
        const response = await axios.get(`https://myhealth-server-side.vercel.app/content`);
        const res = response.data.filter((e)=>e.title===title);
        console.log(res);
        setContent(res);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchContent();
  }, [title]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!content) return <ErrorPage />;

  return (
    <div className='ml-5'>
     {content.map((content,index)=>(
     <div key={index}>
       <h1 className='text-3xl mt-4 mb-8 text-center'>{content.title}</h1>
      <div><strong>Definition:</strong> <p className='bg-yellow-500 m-4 p-4'>{content.about}</p></div>
      <div><strong>Symptoms:</strong> <p className='bg-yellow-500 m-4 p-4'>{content.symptomps}</p></div>
      <div><strong>Prevention:</strong> <p className='bg-yellow-500 m-4 p-4'>{content.prevent}</p></div>
      <div><strong>Medicine + First Aid:</strong> <p className='bg-yellow-500 m-4 p-4'>{content.medicine}</p></div>
      </div>
     ))}
    </div>
  );
};

export default Service_Details;