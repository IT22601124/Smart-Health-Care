import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://192.168.1.6:5001/api/appointments/${id}`);
        setAppointment(response.data);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
        alert('Error fetching appointment details');
      }
    };

    fetchAppointment();
  }, [id]);

  if (!appointment) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Appointment Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
      
        <p><strong>Full Name:</strong> {appointment.fullName}</p>
        <p><strong>Email:</strong> {appointment.email}</p>
        <p><strong>Gender:</strong> {appointment.gender}</p>
        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Doctor:</strong> {appointment.doctorId.name}</p>
      </div>
    </div>
  );
};

export default AppointmentDetails;
