const { Pool } = require('pg');
require("dotenv").config()

const pool = new Pool({
  connectionString: process.env.POSTGRACE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

function mysqlConn(query,ress){
pool.query(`${query}`, (err, res) => {
  if (err) {
    console.error('Error executing query', err.stack);
    return ress(err.stack)
  } else {
    console.log('Connection successful, current time:', res.rows);
    return ress(res.rows)
  }

  pool.end();
});
}


module.exports  = {mysqlConn}


