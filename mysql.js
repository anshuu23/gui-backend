const mysql = require('mysql2');
require("dotenv").config()



const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST ,
  user: process.env.MYSQL_USER, 
  password: process.env.MYQL_PASSWORD, 
  database: process.env.MYSQL_DB, 
  port: process.env.MYSQL_PORT ,
  ssl: {
    rejectUnauthorized: false
  },
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});

function mysqlCon(query,ress){
connection.query(`${query}`, (err, results) => {
  if (err) {
    console.error('Error executing query:', err.stack);
   
    return ress(err.stack)
  } else {
    console.log('Query results:', results);
   
    return ress(results)
    
  }
});
}


function checkUser(email,password,ress){
  connection.query(`select * from abc where email='${email}' and password = '${password}'`, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
     
      return ress(err.stack)
    } else {
      console.log('Query results:', results);
     
      return  ress(results)
      
    }
  });
  
}

module.exports = {mysqlCon,checkUser};
