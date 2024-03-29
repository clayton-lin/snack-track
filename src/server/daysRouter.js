const { Router } = require('express');
const db = require('../database/postgresql')
const router = Router();

const getDayInfo = async (req, res) => {
  const { id, date } = req.params;
  const userId = parseInt(id.slice(1));
  const dateString = date.slice(1);
  const dayEntries = await db.getDayEntries(userId, dateString);
  res.send(dayEntries);
}

router
  .route('/:id/:date')
  .get(getDayInfo);

module.exports = router;
