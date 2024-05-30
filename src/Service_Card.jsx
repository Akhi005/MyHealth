import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Service_Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      
        const response = await axios.get('http://localhost:4000/content');
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='text-center space-x-16'>
      <h1 className='text-center text-3xl mt-4 mb-8'>Content</h1>
      <div className='pl-24 flex flex-wrap'>
        {data.map(item => (
          <div className="card w-72 m-4" key={item.id} >
            <img src={item.imgurl} className="card-img-top h-[160px]" alt={item.title} />
            <div className="card-body">
              <h2 className="card-text text-2xl">{item.title}</h2>
              <p>{item.about}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service_Card;
