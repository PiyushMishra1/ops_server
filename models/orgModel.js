const connection = require("../config/config");

const createOrg = (tbl_name, datatoInsert) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${tbl_name} SET ? `;
    connection.query(sql, [datatoInsert], (err, result) => {
      if (err) reject(err);
      resolve(result && result.affectedRows > 0 ? true : false);
    });
  });
};

module.exports = { createOrg };
