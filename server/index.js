const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send(`hello there`);
});

app.listen(port, () => { console.log(`listerning to port ${port}`)});
