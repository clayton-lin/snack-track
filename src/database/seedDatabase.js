// Script to populate PostgreSQL database with seed data

const pg = require('pg');
const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER,
  PG_PASSWORD
} = require('../../config');
const { snacks } = require('./seedData.json');

const client = new pg.Client({
  user: process.env.USER || PG_USER,
  host: process.env.HOST || PG_HOST,
  database: process.env.DATABASE || PG_DATABASE,
  password: process.env.PASSWORD || PG_PASSWORD,
  port: process.env.PORT || PG_PORT,
});

client.connect();

const snackCol = '(user_id, name, flavor, serving_size, calories, fat, carb, fiber, sugar, protein, image_url, nutrition_label_url)';
const snackParam = '($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
const promiseArr = [];

const getValuesArr = (snack) => {
  const values = [
    snack.userId,
    snack.name,
    snack.flavor,
    snack.servingSize,
    snack.calories,
    snack.fat,
    snack.carb,
    snack.fiber,
    snack.sugar,
    snack.protein,
    snack.imageUrl,
    snack.nutritionLabelUrl
  ];

  // convert 'null' string to null value
  values.forEach((ele, i) => {
    if (ele === 'null') {
      values[i] = null;
    }
  });

  return values;
};

const seedDbWithSnacks = (snacks) => {
  snacks.forEach(async (snack) => {
    const text = `INSERT INTO foods ${snackCol} VALUES ${snackParam}`;
    const values = getValuesArr(snack);

    promiseArr.push(
      client.query(text, values)
      .then(() => {
        const foodName = snack.name + ((snack.flavor === 'null') ? '' : (` ${snack.flavor}`));
        console.log(`Snack "${foodName}" successfully added to database`);
      })
    );

  });

  Promise.all(promiseArr)
    .then(() => {
      client.end();
      console.log('Database connection closed')
    })
};

seedDbWithSnacks(snacks);
