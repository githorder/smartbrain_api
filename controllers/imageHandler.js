const imageHandlerPut = (db) => (req, res) => {
  const { id } = req.body;

  db('users')
    .where('id', '=', id)
    .increment('rank', 1)
    .returning('rank')
    .then((ranks) => {
      if (ranks.length) {
        res.status(200).json(ranks[0]);
      } else {
        res.status(400).json('Unable to get rank');
      }
    })
    .catch(() => {
      res.status(500).json('some server error');
    });
};

module.exports = {
  imageHandlerPut,
};
