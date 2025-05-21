import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const HomeServices = () => {
  const [service, setService] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showMedicineInput, setShowMedicineInput] = useState(false)
  const navigate = useNavigate()
  const handleHomeService = (e) => {
    e.preventDefault()
    const pname = e.target.pname.value
    const pcode = e.target.pcode.value
    const email = e.target.email.value
    const paddress = e.target.paddress.value
    const pphone = e.target.pphone.value
    const service = e.target.service.value
    const medicineName = e.target.medicineName ? e.target.medicineName.value : ''
    axios
      .post('http://localhost:4000/homeservice', { pname, pcode, email, paddress, pphone, service, medicineName })
      .then(() => {
        setShowModal(true)
        navigate('/')
      })
      .catch((error) => {
        console.error('There was an error processing your request!', error)
      })
  }
  const handleServiceChange = (e) => {
    const selectedService = e.target.value
    setService(selectedService)
    setShowMedicineInput(selectedService === 'Medicine')
  }
  return (
      <div className="flex h-[100vh] w-full justify-center items-center text-xl">
        <form onSubmit={handleHomeService} className="flex-2 ">
          <h1 className="text-center text-3xl my-3 w-full">Home Service</h1>
        <div className='flex flex-col w-full h-[88vh] md:w-[600px] bg-gray-300 p-5 space-y-3'>
            <label>Patient Name</label>
            <input type="text" name="pname" className='p-2 rounded-xl' required />
            <label>Patient Code</label>
            <input type="text" name="pcode"className='p-2 rounded-xl'  required />
            <label>Email</label>
            <input type="email" name="email"className='p-2 rounded-xl'  required />
            <label>Address</label>
            <input type="text" name="paddress" className='p-2 rounded-xl' required />
            <label>Phone number</label>
            <input type="tel" name="pphone" className='p-2 rounded-xl' required />
            <label>Service</label>
            <select name="service" className='p-2 rounded-xl' value={service} onChange={handleServiceChange} required>
              <option value="" disabled>
                Select Service
              </option>
              <option value="Report Delivery">Report Delivery</option>
              <option value="Medicine">Medicine</option>
              <option value="Nursing Home Care">Nursing Home Care</option>
            </select>
            {showMedicineInput && (
              <>
                <label>Medicine Name</label>
                <input type="text" name="medicineName" required />
              </>
            )}
            <input type="submit" className="bg-yellow-600 mt-5 p-2 rounded-2xl text-white" value="Submit" />
          </div>
        </form>
        <img
          className="flex-1 w-full md:w-auto max-w-[800px] object-cover"
          src="https://i.ibb.co/Mn3K2LL/Capture.png"
          alt="Home Service Illustration"
        />
      

      {showModal && (
        <dialog id="my_modal_1" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations !!</h3>
            <p className="py-4">Your service request has been taken... You will get your service soon.</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default HomeServices
