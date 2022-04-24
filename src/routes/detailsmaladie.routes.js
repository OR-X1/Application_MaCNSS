
const detailsmaladie = require("../controller/detailsmaladie.controller")
const express = require("express")
const router = express.Router();

//detailsmaladie
router.get('/', detailsmaladie.index);
router.post('/store',detailsmaladie.store);
router.delete('/:id',detailsmaladie.deletedetailsmaladie);
router.put('/updatedetailsmaladie/:id', detailsmaladie.updatedetailsmaladie);

module.exports = router;