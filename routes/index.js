var express = require("express");
var router = express.Router();

const {
  getLoginPage,
  authencateUser,
} = require("../controllers/indexController");
/* GET home page. */

router.get("/", getLoginPage);
router.post("/", authencateUser);

module.exports = router;
