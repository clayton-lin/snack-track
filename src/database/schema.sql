CREATE SCHEMA snack

DROP TABLE IF EXISTS users
CREATE TABLE players (
  user_id serial PRIMARY KEY,
  google_id VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL
)

DROP TABLE IF EXISTS days
CREATE TABLE days (
  day_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  date DATE NOT NULL
)

DROP TABLE IF EXISTS foods (
  food_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id)
  created_on TIMESTAMP NOT NULL,
  updated_on TIMESTAMP NOT NULL,
  name VARCHAR(100) NOT NULL,
  serving_size VARCHAR(50) NOT NULL,
  calories SMALLINT NOT NULL,
  fat SMALLINT NOT NULL,
  carb SMALLINT NOT NULL,
  fiber SMALLINT NOT NULL,
  sugar SMALLINT NOT NULL,
  protein SMALLINT NOT NULL,
  image_url VARCHAR(255),
  nutrition_label_url VARCHAR(255)
)

DROP TABLE IF EXISTS entries
CREATE TABLE entries (
  entry_id SERIAL PRIMARY KEY,
  day_id INTEGER REFERENCES days(day_id),
  food_id INTEGER REFERENCES foods(food_id),
  num_servings INTEGER NOT NULL
)

DROP TABLE IF EXISTS user_food
CREATE TABLE user_food (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(user_id),
  food_id INTEGER REFERENCES foods(food_id),
)


