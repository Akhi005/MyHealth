import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create_Content = () => {
  const navigate=useNavigate();
  const handleform = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const title = e.target.heading.value;
    const about = e.target.about.value;
    const symptomps = e.target.symptomps.value;
    const prevent = e.target.prevent.value;
    const medicine = e.target.medicine.value;
    const imgurl = e.target.imgurl.value;
    console.log(email, title, about, symptomps, prevent, medicine, imgurl);
     
    try {
      const response = await axios.post('https://myhealth-server-side-akhi005-akhis-projects.vercel.app/createcontent', {
        title,
        about,
        symptomps,
        prevent,
        medicine,
        email,
        imgurl,
      });
      console.log('User saved:', response);
      navigate('/');
    } catch (error) {
      console.error('There was an error creating the content:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleform}>
        <img className='fixed w-full' src="https://i.ibb.co/KX7ZPYn/Soothing-nature-backgrounds-2-1024x684.jpg" alt="background" />
        <div className='relative p-5 bg-gradient-to-l from-gray-700'>
          <h1 className="text-center text-white text-4xl py-3 mb-4 font-sans">Content</h1>
          <div className='grid grid-cols-2'>
            <div>
              <h1 className='text-white'>Email</h1>
              <input type="email" className="p-2 rounded-xl my-2 w-[480px]" name="email" required />
            </div>
            <div>
              <h1 className='text-white'>Content Title</h1>
              <div className="flex">
                <input type="text" className="p-2 rounded-xl my-2 w-[480px]" name="heading" required />
              </div>
            </div>
            <div>
              <h1 className='text-white'>About</h1>
              <textarea name="about" className="p-2 rounded-xl my-2 w-[480px]"></textarea>
            </div>
            <div>
              <h1 className='text-white'>Symptomps</h1>
              <textarea name="symptomps" className="p-2 rounded-xl my-2 w-[480px]"></textarea>
            </div>
            <div>
              <h1 className='text-white'>How to Prevent?</h1>
              <textarea name="prevent" className="p-2 rounded-xl my-2 w-[480px]"></textarea>
            </div>
            <div>
              <h1 className='text-white'>Medicine + First Aid</h1>
              <textarea name="medicine" className="p-2 rounded-xl my-2 w-[480px]"></textarea>
            </div>
            <div>
              <h1 className='text-white my-2'>ImageURL</h1>
              <input name="imgurl" type="text" className='w-[480px]' />
            </div>
          </div>
          <input className="py-2 px-4 my-4 text-center rounded bg-red-700 text-white ml-[550px]" type="submit" value="Create Content" />
        </div>
      </form>
    </div>
  );
};

export default Create_Content;
