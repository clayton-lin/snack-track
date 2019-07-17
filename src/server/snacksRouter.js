const { Router } = require('express');
const db = require('../database/postgresql')
const router = Router();

const getAllSnacks = async (req, res) => {
  const { id } = req.params;
  const snackId = parseInt(id.slice(1));
  const snacks = await db.getAllSnacks(snackId);
  res.status(200).send(snacks);
}

router
  .route('/:id')
  .get(getAllSnacks);

module.exports = router;
