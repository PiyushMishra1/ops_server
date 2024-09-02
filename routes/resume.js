var express = require("express");
const { resumeCreate } = require("../controllers/resumeController");
var router = express.Router();

router.post("/createResume", resumeCreate);
module.exports = router;
