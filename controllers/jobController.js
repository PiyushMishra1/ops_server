const { insertData, getAllData } = require("../models/CRUDModel");
const generateUniqueId = require("generate-unique-id");

module.exports = {
  jobGet: async (req, res) => {
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
      record_status: 0,
    };
    const job_data = await getAllData("tbl_jobs_info", condition);
    if (job_data) {
      res.json({
        status: true,
        message: "Jobs data retrieved successfully.",
        code: 200,
        data: job_data,
      });
    } else {
      res.json({
        status: false,
        message: "Failed to retrieve organization data.",
        code: 500,
      });
    }
  },
  jobCreate: async (req, res) => {
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
      name: req.body.job_title,
    };

    const job_id = generateUniqueId({ length: 16 });

    var datetime = new Date();
    const date = datetime.toISOString().slice(0, 10);

    function isEmpty(value) {
      return (
        (typeof value == "string" && !value.trim()) ||
        typeof value == "undefined" ||
        value === null
      );
    }

    const datatoInsert = {
      job_id: job_id,
      name: req.body.job_title.trim(),
      description: req.body.description.trim(),
      created_at: date,
      org_id: req.body.company.trim(),
    };
    const hasEmptyValue = Object.values(datatoInsert).some(isEmpty);

    if (!hasEmptyValue) {
      const job_data = await getAllData("tbl_jobs_info", condition);
      //check if job_data exists
      if (!job_data) {
        const result = await insertData("tbl_jobs_info", datatoInsert);
        if (result) {
          res.json({
            status: true,
            message: "Job created successfully.",
            code: 201,
            job_id: job_id,
          });
        } else {
          console.log("Error inserting data");
          res.json({
            status: false,
            message: "Error creating job.",
            code: 500,
          });
        }
      } else {
        console.log("job already exists");
        res.json({
          status: false,
          message: "Job title already exists.",
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
