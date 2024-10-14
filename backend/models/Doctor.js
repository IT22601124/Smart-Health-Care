import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  availableTime: { type: String, required: true },
  hospital: { type: String, required: true },
  profilePic: { type: String, required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
