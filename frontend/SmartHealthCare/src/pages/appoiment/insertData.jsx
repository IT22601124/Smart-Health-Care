  import React, { useState } from 'react';
  import axios from 'axios';

  const InsertData = () => {
    const [profilePic, setProfilePic] = useState('');
    const [profilePicFile, setProfilePicFile] = useState(null); // To handle file upload
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [availableTime, setAvailableTime] = useState('');
    const [hospital, setHospital] = useState('');

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setProfilePicFile(file);
      setProfilePic(URL.createObjectURL(file)); // Preview the image
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('profilePic', profilePicFile); // Append the file to form data
      formData.append('name', name);
      formData.append('specialty', specialty);
      formData.append('availableTime', availableTime);
      formData.append('hospital', hospital);

      try {
        const response = await axios.post('http://192.168.1.6:5001/api/doctor', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Doctor profile added:', response.data);
        alert('Doctor profile added successfully');
      } catch (error) {
        if (error.response) {
          console.error('Server responded with an error:', error.response.data);
          alert('Error adding doctor profile: ' + error.response.data.message);
        } else {
          console.error('Error adding doctor profile:', error.message);
          alert('Error adding doctor profile: ' + error.message);
        }
      }
      
    };

    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Add Doctor Profile</h2>

          <label className="block mb-4">
            <span className="text-gray-600 font-medium">Profile Picture:</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 outline-none transition duration-150"
              required
            />
          </label>

          {profilePic && (
            <div className="mb-4">
              <img src={profilePic} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
              <p className="text-center text-gray-600 mt-2">Profile Picture Preview</p>
            </div>
          )}

          <label className="block mb-4">
            <span className="text-gray-600 font-medium">Name:</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 outline-none transition duration-150"
              placeholder="Enter doctor's name"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-600 font-medium">Specialty:</span>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 outline-none transition duration-150"
              placeholder="Enter doctor's specialty"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-600 font-medium">Available Time:</span>
            <input
              type="text"
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 outline-none transition duration-150"
              placeholder="Enter available time"
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-600 font-medium">Hospital:</span>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400 outline-none transition duration-150"
              placeholder="Enter hospital name"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-150 ease-in-out"
          >
            Add Doctor
          </button>
        </form>
      </div>
    );
  };

  export default InsertData;
