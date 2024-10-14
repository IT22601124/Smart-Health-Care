import React from 'react'
import Home from './pages/Home'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import InsertData from './pages/appoiment/insertData';
import DoctorList from './pages/appoiment/DoctorList ';
import DoctorDetails from './pages/appoiment/DoctorDetails ';
import AdminDashboard from './pages/admin/AdminDashboard';
import AppointmentDetails from './pages/admin/AppointmentDetails';
import PaymentInterface from './pages/payment/PaymentInterface';
import PaymentDetails from './pages/admin/PaymentDetails';
import UpdateAppointment from './pages/admin/UpdateAppointment';
import Sidebar from './pages/sidebar';
import Dashboard from './pages/dashboard';
import PatientRecord from "./pages/PatientRecord";
import AddPatient from "./pages/AddPatient";
import UpdatePatient from "./pages/UpdatePatient";
import Report from "./pages/Report";
import AddReport from "./pages/AddReport";
import Main from "./pages/Main";

const routes=(
  <Router>
  <Routes>
    <Route path='/dashboard' exact element={<Home/>}   />
    <Route path='/DoctorsList' exact element={<DoctorList/>}   />
    <Route path='/InsertData' exact element={<InsertData/>}   />
    <Route path='/doctor/:id' exact element={<DoctorDetails/>}   />
    <Route path='/admin' exact element={<AdminDashboard/>}   />
    <Route path="/admin/appointments/:id" element={<AppointmentDetails />} />
    <Route path='/payment' exact element={<PaymentInterface/>}   />
    <Route path='/paymentD' exact element={<PaymentDetails/>}   />
    <Route path='/admin/appointments/edit/:id' exact element={<UpdateAppointment/>}   />
    <Route path='Sidebar' exact element={<Sidebar/>}   />
    <Route path='dash' exact element={<Dashboard/>}   />
    <Route path="/" element={<Main />} />
    <Route path="/patient-record" element={<PatientRecord />} />
    <Route path="/add-patient" element={<AddPatient />} />
    <Route path="/update-patient/:patientId" element={<UpdatePatient />} />
    <Route path="/reports" element={<Report />} />
    <Route path="/add-report" element={<AddReport />} />
    
  </Routes>

  </Router>
);


const App = () => {
  return (
    <div>
        {routes}
    </div>
  )
}

export default App
