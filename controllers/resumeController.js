const generateUniqueId = require("generate-unique-id");
const { insertData, getAllData } = require("../models/CRUDModel");

module.exports = {
  resumeCreate: async (req, res) => {
    const condition = {
      email: req.body.email,
    };

    const res_id = generateUniqueId({ length: 16 });

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
      resume_id: res_id,
      f_name: req.body.f_name.trim(),
      l_name: req.body.l_name.trim(),
      email: req.body.email.trim(),
      mobile: req.body.mobile.trim(),
      linked_in: req.body.linked_in.trim(),
      expected_ctc: req.body.expected_ctc.trim(),
      current_ctc: req.body.current_ctc.trim(),
      notice_period: req.body.notice_period.trim(),
      cover_letter: req.body.cover_letter.trim(),
      resume_link: req.body.resume_link.trim(),
      created_at: date,
    };

    const hasEmptyValue = Object.values(datatoInsert).some(isEmpty);

    if (!hasEmptyValue) {
      const data = await getAllData("tbl_resume_info", condition);
      if (!data) {
        const result = await insertData("tbl_resume_info", datatoInsert);
        if (result) {
          res.json({
            status: true,
            message: "Resume created successfully.",
            code: 200,
            resume_id: res_id,
          });
        } else {
          res.json({
            status: false,
            message: "Failed to create resume.",
            code: 500,
          });
        }
      } else {
        console.log("resume already exists");
        res.json({
          status: false,
          message: "Email already exists.",
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
