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

client
  .connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Database connection error', err)
  });

const getAllSnacks = async (id) => {
  const query = id ? `SELECT * FROM foods WHERE user_id IS NULL OR user_id=${id}` : 'SELECT * FROM foods WHERE user_id IS NULL'
  let snacks;

  await client.query(query)
    .then((res) => {
      snacks = res.rows
    })
    .catch((err) => {
      console.log('Error: ', err);
    });

  return snacks;
}

module.exports = {
  getAllSnacks
};
