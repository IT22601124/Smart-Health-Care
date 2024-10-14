import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateAppointment = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://192.168.1.6:5001/api/appointments/${id}`);
        setAppointment(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointment:', error);
        alert('Error fetching appointment');
      }
    };

    fetchAppointment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.1.6:5001/api/appointments/${id}`, appointment);
      alert('Appointment updated successfully');
      navigate('/admin/appointments'); // Navigate back to the appointments list
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Error updating appointment');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Update Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={appointment.fullName}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={appointment.email}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Gender:</label>
          <select
            name="gender"
            value={appointment.gender}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Date:</label>
          <input
            type="date"
            name="date"
            value={appointment.date.split('T')[0]} // Convert ISO string to date string
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Time:</label>
          <input
            type="time"
            name="time"
            value={appointment.time}
            onChange={handleChange}
            required
            className="border rounded w-full p-2"
          />
        </div>
        <div>
          <label className="block mb-2">Doctor:</label>
          <input
            type="text"
            name="doctorId"
            value={appointment.doctorId?.name || ''}
            onChange={handleChange}
            className="border rounded w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Update Appointment
        </button>
      </form>
    </div>
  );
};

export default UpdateAppointment;
