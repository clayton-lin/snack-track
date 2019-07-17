const { Router } = require('express');
const db = require('../database/postgresql')
const router = Router();

const addNewEntry = async (req, res) => {
  const { dayId, foodId } = req.body;
  const newEntry = await db.addNewEntry(dayId, foodId);
  res.send(newEntry);
}

const updateServingCount = async (req, res) => {
  const { entryId, servings } = req.body;
  const updatedEntry = await db.updateEntryServings(entryId, servings);
  res.send(updatedEntry);
}

router
  .route('/')
  .post(addNewEntry)
  .put(updateServingCount);


module.exports = router;
