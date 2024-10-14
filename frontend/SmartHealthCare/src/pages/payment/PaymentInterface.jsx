import React, { useState } from 'react';
import visa from '../../assets/visa.jpg';
import mas from '../../assets/mas.jpg';
import Sidebar from '../sidebar';
import Dashboard from '../dashboard';

const PaymentInterface = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Default payment method
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cashReceived, setCashReceived] = useState(''); // For cash payments
  const [insuranceProvider, setInsuranceProvider] = useState(''); // For insurance payments
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Payment success status
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  // Sample treatment costs
  const treatmentCost = 300;
  const labCost = 200;
  const radiologyCost = 150;
  const doctorCharges = 250;
  const discount = 0.10; // 10% discount

  // Calculate total
  const total = (treatmentCost + labCost + radiologyCost + doctorCharges) * (1 - discount);

  const handlePayment = async () => {
    const paymentData = {
      appointmentId: "670d268735f6884d389fa8cd",  // Replace with actual appointment ID
      paymentMethod,
      amount: total,
      cardDetails: paymentMethod === 'creditCard' ? { cardNumber, expiryDate, cvv } : null,
      cashReceived: paymentMethod === 'cash' ? cashReceived : null,
      changeGiven: paymentMethod === 'cash' && cashReceived > total ? (cashReceived - total) : 0,
    };

    try {
      const response = await fetch('http://192.168.1.6:5001/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      if (response.ok) {
        setPaymentSuccess(true);
        setErrorMessage(''); // Clear any previous error
        console.log('Payment successful:', result);
      } else {
        setPaymentSuccess(false);
        setErrorMessage(result.message); // Display error message from server
        console.error('Payment failed:', result.message);
      }
    } catch (error) {
      setPaymentSuccess(false);
      setErrorMessage('Error processing payment. Please try again.');
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <Dashboard/>
   
    <div className="flex justify-center items-center h-screen bg-gray-100 p-1">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl flex">
        {/* Payment Section */}
        <div className="p-6 w-2/3 border-r">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Payment Details</h2>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  value="creditCard" 
                  checked={paymentMethod === 'creditCard'} 
                  onChange={() => setPaymentMethod('creditCard')} 
                  className="mr-2"
                /> Credit Card
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  value="cash" 
                  checked={paymentMethod === 'cash'} 
                  onChange={() => setPaymentMethod('cash')} 
                  className="mr-2"
                /> Cash
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  value="insurance" 
                  checked={paymentMethod === 'insurance'} 
                  onChange={() => setPaymentMethod('insurance')} 
                  className="mr-2"
                /> Insurance
              </label>
            </div>
          </div>

          {/* Cash Payment Section */}
          {paymentMethod === 'cash' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Cash Payment</h3>
              <input 
                type="number" 
                placeholder="Enter Cash Received" 
                className="border p-2 w-full mb-4 rounded"
                value={cashReceived} 
                onChange={(e) => setCashReceived(e.target.value)} 
              />
              <div className="text-sm">
                <p>Total Due: <span className="font-bold">${total.toFixed(2)}</span></p>
                <p>Cash Received: <span className="font-bold">${cashReceived || 0}</span></p>
                <p>Change: <span className="font-bold">${(cashReceived - total > 0 ? cashReceived - total : 0).toFixed(2)}</span></p>
              </div>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
                onClick={handlePayment}
                disabled={cashReceived < total} // Disable button if cash received is less than total
              >
                Complete Payment
              </button>
            </div>
          )}

          {/* Credit Card Section */}
          {paymentMethod === 'creditCard' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Credit Card Payment</h3>
              <input 
                type="text" 
                placeholder="Card Number" 
                className="border p-2 w-full mb-4 rounded" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)} 
              />
              <div className="flex space-x-4 mb-4">
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="border p-2 w-1/2 rounded" 
                  value={expiryDate} 
                  onChange={(e) => setExpiryDate(e.target.value)} 
                />
                <input 
                  type="text" 
                  placeholder="CVV" 
                  className="border p-2 w-1/2 rounded" 
                  value={cvv} 
                  onChange={(e) => setCvv(e.target.value)} 
                />
              </div>
              <div className="flex space-x-2 mb-4">
                <img src={visa} alt="Visa" className="h-10" />
                <img src={mas} alt="Mastercard" className="h-10" />
              </div>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>
          )}

          {/* Insurance Payment Section */}
          {paymentMethod === 'insurance' && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Insurance Payment</h3>
              <input 
                type="text" 
                placeholder="Insurance Provider" 
                className="border p-2 w-full mb-4 rounded" 
                value={insuranceProvider} 
                onChange={(e) => setInsuranceProvider(e.target.value)} 
              />
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={handlePayment}
              >
                Process Insurance
              </button>
            </div>
          )}

          {/* Display payment success or error message */}
          {paymentSuccess && <p className="text-green-500">Payment Successful!</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>

        {/* Billing Summary Section */}
        <div className="p-6 w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Billing Summary</h2>
          <div className="text-lg mb-4">
            <p>Treatment: <span className="float-right">${treatmentCost}</span></p>
            <p>Laboratory: <span className="float-right">${labCost}</span></p>
            <p>Radiology: <span className="float-right">${radiologyCost}</span></p>
            <p>Doctor Charges: <span className="float-right">${doctorCharges}</span></p>
          </div>
          <div className="text-lg mb-4">
            <p>Discount: <span className="float-right">{discount * 100}%</span></p>
            <p className="font-bold">Total: <span className="float-right">${total.toFixed(2)}</span></p>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
            Download Bill
          </button>
        </div>
      </div>
    </div>
     </div>
  );
};

export default PaymentInterface;
