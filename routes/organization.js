var express = require("express");
const { orgCreate } = require("../controllers/orgController");

var router = express.Router();

router.post("/createOrg", orgCreate);
module.exports = router;
