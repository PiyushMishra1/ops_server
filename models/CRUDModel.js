const connection = require("../config/config");

const getAllData = (tbl_name, condition) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM ${tbl_name} WHERE ?`;

    connection.query(sql, [condition], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result.length ? result : null);
      }
    });
  });
};

const updateTable = (tbl_name, condition, datatoUpdate) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${tbl_name} SET ? WHERE ?`;

    connection.query(sql, [datatoUpdate], [condition], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result && result.affectedRows > 0 ? true : false);
      }
    });
  });
};
const insertData = (tbl_name, condition, datatoInsert) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO ${tbl_name} SET ?`;

    connection.query(sql, [datatoInsert], [condition], (err, result) => {
      if (err) reject(err);
      else {
        resolve(result && result.affectedRows > 0 ? true : false);
      }
    });
  });
};

module.exports = { getAllData, updateTable, insertData };
