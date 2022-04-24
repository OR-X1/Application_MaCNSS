
const patient = require("../controller/patient.controller")
const express = require("express")
const router = express.Router();

//patient
router.get('/', patient.index);
router.post('/store',patient.store);
router.delete('/:id',patient.deletepatient);
router.put('/updatepatient/:id', patient.updatepatient);
router.post('/login', patient.loginpatient);

module.exports = router;