const dossiermedical = require("../controller/dossiermedical.controller");
const express = require("express")
const router = express.Router();


//dossiermedical
router.get('/', dossiermedical.index);
router.post('/store', dossiermedical.store);
router.delete('/:id', dossiermedical.deletedossiermedical);



module.exports = router;