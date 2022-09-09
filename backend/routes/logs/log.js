const express = require("express");
const router = express.Router();

const LogController = require("../../controller/logs/log");


router.get("",LogController.getLog);

module.exports  = router;