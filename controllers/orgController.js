const generateUniqueId = require("generate-unique-id");
const { createOrg } = require("../models/orgModel");
const { getAllData } = require("../models/CRUDModel");

module.exports = {
  orgCreate: async (req, res) => {
    //condition for unique org.
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized. No token provided.",
        code: 401,
      });
    }
    const condition = {
      email: req.body.email,
    };

    const org_id = generateUniqueId({ length: 16 });
    var datetime = new Date();
    const date = datetime.toISOString().slice(0, 10);

    function isEmpty(value) {
      return (
        (typeof value == "string" && !value.trim()) ||
        typeof value == "undefined" ||
        value === null
      );
    }

    // data to be inserted into tbl_org_info table.
    const datatoInsert = {
      org_name: req.body.org_name.trim(),
      created_at: date,
      gst: req.body.gst.trim(),
      pan: req.body.pan.trim(),
      tin: req.body.tin.trim(),
      coi: req.body.coi.trim(),
      mobile: req.body.mobile.trim(),
      email: req.body.email.trim(),
      org_id: org_id,
    };

    const hasEmptyValue = Object.values(datatoInsert).some(isEmpty);

    if (!hasEmptyValue) {
      // getting org data
      const orgData = await getAllData("tbl_org_info", condition);
      // if org does not exist, create the org. else, return conflict status code.
      if (!orgData) {
        const response = await createOrg("tbl_org_info", datatoInsert);
        if (response) {
          console.log("org created successfully");
          res.json({
            status: true,
            message: "Organization created successfully.",
            code: 200,
            org_id: org_id,
          });
        }
      } else {
        console.log("org already exists");
        res.json({
          status: false,
          message: "Organization already exists.",
          code: 409,
        });
      }
    } else {
      console.log("empty fields");
      res.json({
        status: false,
        message: "All fields are required.",
        code: 400,
      });
    }
  },
};
