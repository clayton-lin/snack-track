const { Router } = require('express');
const db = require('../database/postgresql')
const router = Router();

const getAllSnacks = async (req, res) => {
  const { id } = req.params;
  const idParsed = parseInt(id.slice(1));
  const snacks = await db.getAllSnacks(idParsed);
  res.status(200).send(snacks);
}

router
  .route('/:id')
  .get(getAllSnacks);
  // .post();


module.exports = router;
