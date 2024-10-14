import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar';

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // For searching payment method
  const [filterDate, setFilterDate] = useState(''); // For filtering by date

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://192.168.1.6:5001/api/payments'); // Update with your API endpoint
        setPayments(response.data);
      } catch (err) {
        setError('Error fetching payment details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Delete payment function
  const deletePayment = async (paymentId) => {
    try {
      await axios.delete(`http://192.168.1.6:5001/api/payments/${paymentId}`); // API endpoint to delete payment
      setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== paymentId)); // Use _id for filtering
    } catch (err) {
      setError('Error deleting payment.');
    }
  };

  // Filter payments based on search query and filter date
  const filteredPayments = payments.filter((payment) => {
    const matchesPaymentMethod = payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = filterDate ? new Date(payment.paymentDate).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;
    return matchesPaymentMethod && matchesDate;
  });

  if (loading) return <p>Loading payments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex'>
    <Sidebar/>
    <div className="container mx-auto p-4">
    
      <h1 className="text-2xl font-bold mb-4">Payment Details</h1>

      {/* Search and Filter Inputs */}
      <div className="mb-4">
       

      <form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onChange={(e) => setSearchQuery(e.target.value)} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
      
      <div className="relative">
  <input
    type="date"
    value={filterDate}
    onChange={(e) => setFilterDate(e.target.value)}
    className="border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 absolute bottom-2 right-10 "
  />
</div>


  


        
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Payment ID</th>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Payment Method</th>
            <th className="border px-4 py-2">Payment Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th> {/* New Column for Actions */}
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment._id}> {/* Use _id for the key */}
              <td className="border px-4 py-2">{payment._id}</td> {/* Use _id for displaying */}
              <td className="border px-4 py-2">{payment.userName}</td>
              <td className="border px-4 py-2">${payment.amount}</td>
              <td className="border px-4 py-2">{payment.paymentMethod}</td>
              <td className="border px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{payment.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => deletePayment(payment._id)} // Use _id for deleting
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default PaymentDetails;
