import React from 'react';

const Ambulance = () => {
    const [gender, setGender] = useState('');

    const handleambulance = async (e) => {
        e.preventDefault();
        const formData = {
            patient_name: e.target.patient_name.value,
            gender: e.target.gender.value,
            phone: e.target.phone.value,
            date: e.target.date.value,
            time: e.target.time.value
        };
            const response = await axios.post('http://localhost:4000/appointment', formData);
            setMessage('Appointment successfully booked!');
            // console.log('User saved:', response.data);
    };

    return (
        <div className='my-4'>
            <h1 className='text-2xl text-center'>Doctor Appointment Request Form</h1>
            <p className='text-center'>
                Fill the form below and we will get back to you soon for more updates and to plan your appointment.
            </p>
            {message && <p className="text-center my-4">{message}</p>}
            <form className="shadow-2xl bg-gray-200 mx-44 px-36" onSubmit={handleambulance}>
                <div className='py-2 flex items-center mt-3 pt-4'>
                    <h1>Patient's Name</h1>
                    <input
                        type="text"
                        className='w-[530px] p-1 ml-4 rounded'
                        name='patient_name'
                        required
                    />
                </div>
                <div className='flex items-center'>
                    <h1>Gender</h1>
                    <select
                        name="gender"
                        className='p-2 rounded-xl ml-4 my-2 w-[550px]'
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className='my-2 flex items-center'>
                    <h1>Phone Number</h1>
                    <input
                        className='w-[500px] rounded p-1 ml-3'
                        type="tel"
                        name="phone"
                        required/>
                </div>
                <div className=''>
                    <h1>Preferred Appointment Date</h1>
                    <input
                        type="date"
                        className='w-[500px] my-2 p-1'
                        name="date"
                        required/>
                </div>
                <div className='pb-4'>
                    <h1>Preferred Appointment Time</h1>
                    <input type="time" name="time" />
                </div>
                <input type="submit" value="Submit" className='ml-80 bg-violet-600 text-white px-12 py-2 rounded mb-4' />
            </form>
        </div>
    );
};

export default Ambulance;