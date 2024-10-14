import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://192.168.1.6:5001/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        alert('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`http://192.168.1.6:5001/api/appointments/${id}`);
        setAppointments((prevAppointments) => 
          prevAppointments.filter((appointment) => appointment._id !== id)
        );
        alert('Appointment deleted successfully');
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Error deleting appointment');
      }
    }
  };

  return (
    <div className='flex'>
    <Sidebar/>
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Appointments Dashboard</h1>
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">Full Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Doctor</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center border px-4 py-2">
                No appointments found.
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{appointment.fullName}</td>
                <td className="border px-4 py-2">{appointment.email}</td>
                <td className="border px-4 py-2">{appointment.gender}</td>
                <td className="border px-4 py-2">{new Date(appointment.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{appointment.time}</td>
                <td className="border px-4 py-2">{appointment.doctorId?.name || 'N/A'}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <Link to={`/admin/appointments/${appointment._id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                      View
                    </button>
                  </Link>
                  <Link to={`/admin/appointments/edit/${appointment._id}`}>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300">
                      Update
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleDelete(appointment._id)} 
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AdminDashboard;
