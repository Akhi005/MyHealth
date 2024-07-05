import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;
const Service_Card = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://myhealth-server-side.vercel.app/content',{withCredentials:true});
        setData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className='text-center space-x-16'>
      <h1 className='text-center text-3xl mt-4 mb-8'>Content</h1>
      <div className='pl-24 flex flex-wrap '>
        {data.map(item => (
          <Link to={`/content/${item.title}`} key={item.id}>
            <div className="card w-72 m-4 bg-lime-300">
              <img src={item.imgurl} className="card-img-top h-[160px]" />
              <div className="card-body">
                <h2 className="card-text text-2xl text-center">{item.title}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Service_Card;
