import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;

// Set up CORS
app.use(cors());

// Get the directory name from the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  },
});

// Create the upload instance
const upload = multer({ storage });

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://tharinduherath2426:Therath2426@smarthealthcare.mnnry.mongodb.net/SmartHealthCare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define the Doctor model
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  availableTime: { type: String, required: true },
  hospital: { type: String, required: true },
  profilePic: { type: String, required: true }, // Store the path of the profile picture
});

const Doctor = mongoose.model('Doctor', doctorSchema ,'doctors');

// Define the API endpoint for adding a doctor
app.post('/api/doctor', upload.single('profilePic'), async (req, res) => {
  const { name, specialty, availableTime, hospital } = req.body;

  // Check for required fields
  if (!req.file) {
    return res.status(400).json({ message: 'Profile picture is required.' });
  }

  if (!name || !specialty || !availableTime || !hospital) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create a new Doctor document
  const newDoctor = new Doctor({
    name,
    specialty,
    availableTime,
    hospital,
    profilePic: req.file.path, // Save the path of the uploaded file
  });

  try {
    // Save the doctor profile to the database
    await newDoctor.save();
    return res.status(201).json({ message: 'Doctor profile added successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error saving doctor profile: ' + error.message });
  }
});

// Define an API endpoint to get all doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving doctors: ' + error.message });
  }
});


// Define an API endpoint to get a doctor by ID
app.get('/api/doctors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving doctor: ' + error.message });
  }
});



// Define the Appointment model
const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true }, // Reference to Doctor
});

const Appointment = mongoose.model('Appointment', appointmentSchema, 'appointments');


// Define an API endpoint for booking an appointment
app.post('/api/appointments', async (req, res) => {
  const { fullName, email, gender, date, time, doctorId } = req.body;

  // Check for required fields
  if (!fullName || !email || !gender || !date || !time || !doctorId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Create a new Appointment document
  const newAppointment = new Appointment({
    fullName,
    email,
    gender,
    date,
    time,
    doctorId,
  });

  try {
    // Save the appointment to the database
    await newAppointment.save();
    return res.status(201).json({ message: 'Appointment booked successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error booking appointment: ' + error.message });
  }
});


// Define an API endpoint to get all appointments
app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId', 'name'); // Populate doctor name
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving appointments: ' + error.message });
  }
});


// Define an API endpoint to get an appointment by ID
app.get('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id).populate('doctorId', 'name');
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json(appointment);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving appointment: ' + error.message });
  }
});


// Define an API endpoint to delete an appointment by ID
app.delete('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting appointment: ' + error.message });
  }
});




// Define the Payment model
const paymentSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true }, // Reference to Appointment
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now }, // Auto-generate the payment date
  cardDetails: { 
    cardNumber: { type: String },
    expiryDate: { type: String },
    cvv: { type: String },
  },
  cashReceived: { type: Number }, // For cash payments
  changeGiven: { type: Number },  // For cash payments
  status: { type: String, default: 'pending' }, // Default status
});

// Ensure payment ID is auto-generated
paymentSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.paymentId = doc._id; // Add a custom paymentId field
    delete ret._id; // Remove the default _id field if you don't want to expose it
    delete ret.__v; // Optionally remove the version key
    return ret;
  },
});

const Payment = mongoose.model('Payment', paymentSchema, 'payments');

// Define an API endpoint for processing payments
app.post('/api/payments', async (req, res) => {
  const { appointmentId, paymentMethod, amount, cardDetails, cashReceived, changeGiven } = req.body;

  // Validate the input
  if (!appointmentId || !paymentMethod || !amount) {
    return res.status(400).json({ message: 'Appointment ID, payment method, and amount are required.' });
  }

  // Create a new Payment document
  const newPayment = new Payment({
    appointmentId,
    paymentMethod,
    amount,
    cardDetails, // Save card details only for card payments
    cashReceived, // Save cash info for cash payments
    changeGiven,  // Calculate change if cashReceived is greater than the amount
  });

  try {
    // Save the payment to the database
    await newPayment.save();
    return res.status(201).json({ message: 'Payment processed successfully', payment: newPayment });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing payment: ' + error.message });
  }
});


app.get('/api/payments', async (req, res) => {
  try {
    const payments = await Payment.find();
    return res.status(200).json(payments);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving payments: ' + error.message });
  }
});



// Define an API endpoint to update an appointment by ID
app.put('/api/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, email, gender, date, time, doctorId } = req.body;

  // Check for required fields
  if (!fullName || !email || !gender || !date || !time || !doctorId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, {
      fullName,
      email,
      gender,
      date,
      time,
      doctorId,
    }, { new: true });

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    return res.status(200).json({ message: 'Appointment updated successfully', updatedAppointment });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating appointment: ' + error.message });
  }
});
// Define an API endpoint to delete a payment by ID
app.delete('/api/payments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting payment: ' + error.message });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
