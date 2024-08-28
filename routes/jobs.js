var express = require("express");
const { jobCreate } = require("../controllers/jobController");
var router = express.Router();

router.post("/createJob", jobCreate);
module.exports = router;
