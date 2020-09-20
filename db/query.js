const mysql = require('mysql');

const connection = mysql.createConnection({
  //host: 'database-1.cjiyvvurlpmp.us-east-2.rds.amazonaws.com',
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'saskatchewanizon',
  port: 3306,
});

connection.connect();

const getProducts = (productId, callback) => {
  if (productId == '0') {
    connection.query(`SELECT * FROM itemData;`, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  } else {
    connection.query(`SELECT * FROM itemData WHERE categoryID = (SELECT categoryId FROM itemData WHERE productId = ('${productId}'));`, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }
};

// `SELECT * FROM itemData WHERE categoryId = (SELECT categoryId FROM itemData WHERE productId = ${productId});`

// const addProduct = (product, callback) => {
//   connection.query(`INSERT INTO itemData (productId,...) VALUES ('${product}',...);`, (err, data) => {
//     if (err) {
//       callback(err, null)
//     } else {
//       callback(null, data)
//     }
//   })
// }

// const deleteProduct = (productId, callback) => {
//   connection.query(`DELETE FROM itemData WHERE productId=('${productId}');`, (err, data) => {
//     if (err) {
//       callback(err, null)
//     } else {
//       callback(null, data)
//     }
//   })
// }

connection.query('SELECT 1 + 1 AS solution', (error, results) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

module.exports = { getProducts };
