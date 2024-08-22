const { getAllData } = require("../models/CRUDModel");

module.exports = {
  getLoginPage: async (req, res) => {
    const condition = {
      flag: 0,
    };
    const response = await getAllData("tbl_admin_info", condition);
    res.json(response);
  },
  authencateUser: async (req, res) => {
    const condition = {
      email: req.body.email,
    };

    var password = req.body.password;

    const Data = await getAllData("tbl_admin_info", condition);

    //checking if email exists
    if (Data) {
      //validating the password
      if (password == Data[0].password) {
        res.json({
          status: true,
          message: "Login Successful",
          code: 200,
        });
      } else {
        res.json({
          status: false,
          message: "Invalid password",
          code: 401,
        });
      }
    } else {
      res.json({
        status: false,
        message: "Invalid Credentials",
        code: 401,
      });
    }
  },
};
