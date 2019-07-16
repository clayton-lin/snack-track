const express = require('express');
const db = require('../database/postgresql');
const router = require('./router');
const port = process.env.PORT || 3000;

const app = express();

app.use('/snacks', router);

app.get('/', (req, res) => {
  res.send(`hello there`);
});

app.listen(port, () => { console.log(`listening to port ${port}`)});
