var express = require("express");
const { orgCreate, orgGet } = require("../controllers/orgController");

var router = express.Router();

router.get("/getOrg", orgGet);
router.post("/createOrg", orgCreate);
module.exports = router;
