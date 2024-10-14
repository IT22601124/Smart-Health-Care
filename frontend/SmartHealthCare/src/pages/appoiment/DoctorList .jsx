import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage  from '../../assets/back.jpg';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // Fetch all doctors when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://192.168.1.6:5001/api/doctors');
        setDoctors(response.data); // Set doctors data to state
        console.log('Fetched doctors:', response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        alert('Error fetching doctors');
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header
        className="flex flex-col items-center py-20"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <h1 className="text-4xl font-bold">Meet the Best Doctors</h1>
        <p className="mt-2 text-lg">We know how large objects will act, but things on a small scale.</p>
        <div className="mt-4 space-x-4">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Get Quote Now</button>
          <button className="bg-transparent border border-white hover:bg-white hover:text-blue-500 text-white font-bold py-2 px-4 rounded">Learn More</button>
        </div>
      </header>
      <div className="container mx-auto p-6">
        <div className="mb-4 flex justify-center">
          <input type="text" placeholder="Search by Name" className="border p-2 rounded-l-md"/>
          <input type="text" placeholder="Specialty" className="border p-2 rounded-l-md"/>
          <button className="bg-blue-500 text-white p-2 rounded-r-md">Search</button>
        </div>
        {doctors.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <li key={doctor._id} className="bg-white shadow-lg rounded-lg p-4 transition-transform hover:scale-105">
                <div onClick={() => navigate(`/doctor/${doctor._id}`)}> {/* Changed from doctor.name to doctor._id */}
                  <img
                    src={doctor.profilePic} // Temporary placeholder image
                    alt={`${doctor.name}'s profile`}
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                  />
                  <p className="text-lg font-semibold"><strong>Name:</strong> {doctor.name}</p>
                  <p className="text-gray-600"><strong>Specialty:</strong> {doctor.specialty}</p>
                  <p className="text-gray-600"><strong>Available Time:</strong> {doctor.availableTime}</p>
                  <p className="text-gray-600"><strong>Hospital:</strong> {doctor.hospital}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorList;
