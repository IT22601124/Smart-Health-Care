// App.js
import React from "react";
import Dashboard from "./dashboard";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Dashboard/>
      {/* Dashboard Welcome Message */}
      <header className="text-center py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard</h2>
        <p className="mt-4 text-lg text-gray-600">
          Manage your health services, track your appointments, and stay informed.
        </p>
      </header>

      {/* Content Section: Overview of Services with Images and Transitions */}
      <section className="container mx-auto py-16">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">Our Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <img
              src="https://via.placeholder.com/150"
              alt="General Checkup"
              className="mx-auto h-24 w-24 mb-4 transition-opacity duration-300 hover:opacity-75"
            />
            <h4 className="text-xl font-semibold text-blue-900 text-center">General Checkup</h4>
            <p className="mt-4 text-gray-600 text-center">
              Stay on top of your health with our comprehensive checkup services.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Specialist Consultations"
              className="mx-auto h-24 w-24 mb-4 transition-opacity duration-300 hover:opacity-75"
            />
            <h4 className="text-xl font-semibold text-blue-900 text-center">Specialist Consultations</h4>
            <p className="mt-4 text-gray-600 text-center">
              Book appointments with top specialists in various medical fields.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
            <img
              src="https://via.placeholder.com/150"
              alt="Health Tracking"
              className="mx-auto h-24 w-24 mb-4 transition-opacity duration-300 hover:opacity-75"
            />
            <h4 className="text-xl font-semibold text-blue-900 text-center">Health Tracking</h4>
            <p className="mt-4 text-gray-600 text-center">
              Monitor your vitals and health metrics in real-time using our tools.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-50 py-16">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-8">What Our Clients Say</h3>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600">
              "The best healthcare platform I've used. It helps me track my health and book appointments easily."
            </p>
            <p className="mt-4 font-semibold text-blue-900">- Jane Doe</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600">
              "I love the health tracking feature. It keeps me informed and connected with my doctor."
            </p>
            <p className="mt-4 font-semibold text-blue-900">- John Smith</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-8">
        <p>&copy; 2024 SmartHealthCare. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
