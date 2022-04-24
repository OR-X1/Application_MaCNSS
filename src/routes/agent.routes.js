
const agent = require("../controller/agent.controller")
const express = require("express")
const router = express.Router();

//agent
router.get('/', agent.index);
router.post('/store',agent.store);
router.delete('/:id',agent.deleteagent);
router.put('/updateagent/:id', agent.updateagent);
router.post('/login', agent.loginagent);

module.exports = router;