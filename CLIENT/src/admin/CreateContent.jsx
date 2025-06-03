import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create_Content = () => {
  const navigate = useNavigate()
  const handleform = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const title = e.target.heading.value
    const about = e.target.about.value
    const symptomps = e.target.symptomps.value
    const prevent = e.target.prevent.value
    const medicine = e.target.medicine.value
    const imgurl = e.target.imgurl.value
    console.log(email, title, about, symptomps, prevent, medicine, imgurl)

    try {
      const response = await axios.post('https://myhealth-server-side.vercel.app/createcontent', {
        title,
        about,
        symptomps,
        prevent,
        medicine,
        email,
        imgurl,
      })
      console.log('User saved:', response)
      navigate('/')
    } catch (error) {
      console.error('There was an error creating the content:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleform}>
        <img
          className="fixed w-full"
          src="https://i.ibb.co/Kj01whMK/360-F-639506337-9-LQK7-W4jkm-Cix-Mk1-TQ6rg-YOW0js-Hi-H0-N.jpg"
          alt="background"
        />
        <div className="relative p-5 text-xl">
          <h1 className="w-full text-center text-white text-4xl my-3 font-semibold py-3 font-sans">Create Content</h1>
          <div className="w-full flex px-24 gap-5 mt-5">
            <div className="flex-1">
              <div className="flex flex-col">
                <label className="text-white">Email</label>
                <input type="email" className="p-2 rounded-xl my-2 " name="email" required />
                <label className="text-white">Content Title</label>
                <input type="text" className="p-2 rounded-xl my-2 " name="heading" required />
                <label className="text-white ">ImageURL</label>
                <input name="imgurl" type="text" className="p-2 rounded-xl my-2 " />
                <label className="text-white">About</label>
                <textarea rows={4} name="about" className="p-2 rounded-xl my-2 "></textarea>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col">
                <label className="text-white">Symptomps</label>
                <textarea rows={3} name="symptomps" className="p-2 rounded-xl my-2 "></textarea>

                <label className="text-white">How to Prevent?</label>
                <textarea rows={3} name="prevent" className="p-2 rounded-xl my-2 "></textarea>

                <label className="text-white">Medicine + First Aid</label>
                <textarea rows={3} name="medicine" className="p-2 rounded-xl my-2 "></textarea>
              </div>
            </div>
          </div>
          <div className="w-full text-center mt-5">
            <input className="px-5 py-3 text-center rounded-xl bg-blue-800 text-white" type="submit" value="Create Content" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Create_Content
