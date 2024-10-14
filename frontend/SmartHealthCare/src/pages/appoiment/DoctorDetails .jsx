import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DoctorDetails = () => {
  const { id } = useParams(); // Get th
  const navigate = useNavigate(); 
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: 'Please Select',
    date: '',
    time: '',
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://192.168.1.6:5001/api/doctors/${id}`);
        console.log('Doctor data:', response.data);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        alert('Error fetching doctor details');
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.6:5001/api/appointments', {
        ...formData,
        doctorId: id,
      });
      alert(response.data.message); // Show success message
      const appointmentId = response.data.appointmentId; // Assuming the appointmentId is returned in the response
      navigate(`/payment`, { state: { appointmentId, amount: 300 /* replace with actual amount */ } });

      // Optionally, reset the form after submission
      setFormData({
        fullName: '',
        email: '',
        gender: 'Please Select',
        date: '',
        time: '',
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment');
    }
  };

  if (!doctor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen pt-6 ">
    <div className="bg-blue-500 text-white p-8 w-1/2 text-center pt-5">
      <img src={doctor.profilePic} alt={`${doctor.name}`} className="w-32 h-32 rounded-full mx-auto absolute" />
      <h1 className="text-3xl font-bold mt-4">{doctor.name}</h1>
      <p className="text-lg">{doctor.specialty}</p>
      <p className="text-md">{doctor.hospital}</p>
    </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-lg lg:w-1/2 w-full">
        <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email address</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Gender</label>
            <select
              name="gender"
              className="w-full p-2 border rounded"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option>Please Select</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              name="date"
              className="w-full p-2 border rounded"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Time</label>
            <input
              type="time"
              name="time"
              className="w-full p-2 border rounded"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorDetails;
