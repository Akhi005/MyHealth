import React from 'react';
import { Link } from 'react-router-dom';

const Service_Card = () => {
  return (
    <div className=' text-center  space-x-16'>
      <h1 className='text-center text-3xl mt-4 mb-8'>Content</h1>
      <div className='pl-24 flex flex-wrap'>

        <Link to='/heat_stroke'><div className="card w-72 m-4">
          <img src="https://i.ibb.co/d2TfgN5/Heat-stoke.jpg" className="card-img-top" />
          <div className="card-body">
            <p className="card-text text-2xl">Heat Stroke</p>
          </div>
        </div>
        </Link>

        <Link to='/heart_attack'><div className="card w-72 m-4">
          <img src="https://i.ibb.co/PZ8WqVH/Heart-Attack.jpg" className="card-img-top" />
          <div className="card-body">
            <p className="card-text text-2xl">Heart Attack</p>
          </div>
        </div>
        </Link>

        <Link to='/diabetes'>
          <div className="card w-72 m-4">
            <img src="https://i.ibb.co/JknzprM/diabetes.jpg" className="card-img-top" />
            <div className="card-body">
             <p className="card-text text-2xl">Diabetes</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Service_Card;