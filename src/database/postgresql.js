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
  .then(() => { console.log('Connected to database'); })
  .catch((err) => { console.error('Database connection error', err); });

const getAllSnacks = async (id) => {
  const query = id ? `SELECT * FROM foods WHERE user_id IS NULL OR user_id=${id}` : 'SELECT * FROM foods WHERE user_id IS NULL'
  let snacks = null;

  await client.query(query)
    .then((res) => { snacks = res.rows; })
    .catch((err) => { console.log('Error: ', err); });

  return snacks;
}

const _createNewDay = async (id, date) => {
  const query = `INSERT INTO days (user_id, date) VALUES (${id}, '${date}') RETURNING day_id`;
  let dayId = null;

  await client.query(query)
    .then((res) => {
      dayId = res.rows[0].day_id;
    })
    .catch((err) => { console.log('Error: ', err); });

  return dayId;
}

const getDayEntries = async (id, date) => {
  const queryDayId = `SELECT day_id FROM days WHERE user_id=${id} AND date='${date}'`;
  let entries = null;

  await client.query(queryDayId)
    .then((res) => {
      return res.rows[0] ? res.rows[0].day_id : _createNewDay(id, date);
    })
    .then((dayId) => {
      const queryEntries = `SELECT * FROM entries WHERE day_id=${dayId}`;
      return client.query(queryEntries);
    })
    .then((res) => {
      entries = res.rows;
    })
    .catch((err) => { console.log('Error: ', err); });

  return entries;
}

const addNewEntry = async (dayId, foodId) => {
  const query = `INSERT INTO entries (day_id, food_id, num_servings) VALUES (${dayId}, ${foodId}, 1) RETURNING *`;
  let entry = null;

  await client.query(query)
    .then((res) => { entry = res.rows[0]; })
    .catch((err) => { console.log('Error: ', err); });

  return entry;
}

const updateEntryServings = async (entryId, servings) => {
  const query = `UPDATE entries SET num_servings=${servings} WHERE entry_id=${entryId} RETURNING *`;
  let entry = null;

  await client.query(query)
    .then((res) => { entry = res.rows[0]; })
    .catch((err) => { console.log('Error: ', err); });

  return entry;  
}

module.exports = {
  getAllSnacks,
  getDayEntries,
  addNewEntry,
  updateEntryServings
};
