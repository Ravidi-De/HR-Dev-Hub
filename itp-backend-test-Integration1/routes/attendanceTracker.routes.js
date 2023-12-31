// routes/attendanceProfileRoutes.js
import express from 'express';
import {
  createAttendanceRecord,
  getAllAttendanceRecords,
  getEmployeeIDByEmail,
  updateAttendanceProfile,
  deleteAttendanceRecord,
  getAttendanceRecordByDocumentId,
  getAttendanceRecordById
} from '../controllers/attendanceTracker.controller';
import {
  createValidation,
  createQRCodeValidation
} from '../validations/attendanceProfileValidation';

const router = express.Router();

// Create a new attendance profile
router.post('/', (req, res) => {
  const { error } = createValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  createAttendanceRecord(req, res);
});

// Get all attendance profiles
router.get('/', getAllAttendanceRecords);


// Get employeeID by email
router.get('/:email',getEmployeeIDByEmail)

// Get a specific attendance profile by ID
router.get('/get/:id', getAttendanceRecordByDocumentId);


// Update an existing attendance profile by ID
router.put('/:id', updateAttendanceProfile);

// Delete an attendance profile by ID
router.delete('/:id', deleteAttendanceRecord);

export default router;
