// routes/patientRoutes.js
const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// @desc Add a new patient
// @route POST /api/patients
router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const createdPatient = await patient.save();
    res.status(201).json(createdPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Get all patients
// @route GET /api/patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get a patient by ID
// @route GET /api/patients/:id
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Update a patient by ID
// @route PUT /api/patients/:id
router.put("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      Object.assign(patient, req.body);
      const updatedPatient = await patient.save();
      res.json(updatedPatient);
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Delete a patient by ID
// @route DELETE /api/patients/:id
router.delete("/:id", async (req, res) => {
  console.log("Deleting patient with ID:", req.params.id); // Log the ID
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient) {
      await patient.remove();
      res.json({ message: "Patient removed" });
    } else {
      res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    console.error("Error deleting patient:", error); // Log the error for more details
    res.status(500).json({ message: "Error deleting patient", error });
  }
});

module.exports = router;
