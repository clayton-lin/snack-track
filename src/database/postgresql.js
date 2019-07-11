const pg = require('pg');
const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD
} = require('../../config');

const client = new pg.Client({
  user: process.env.USER || PG_USER,
  host: process.env.HOST || PG_HOST,
  database: process.env.DATABASE || PG_DATABASE,
  password: process.env.PASSWORD || PG_PASSWORD,
  port: process.env.PORT || PG_PORT,
});

client.connect();

client.query('SELECT * FROM users', (err, res) => {
  console.log(res.rows);
  client.end();
});




