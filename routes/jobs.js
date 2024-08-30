var express = require("express");
const { jobCreate, jobGet } = require("../controllers/jobController");
var router = express.Router();

router.get("/getJob", jobGet);
router.post("/createJob", jobCreate);
module.exports = router;
