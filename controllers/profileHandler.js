const profileHandlerGet = (db) => (req, res) => {
  const { id } = req.params;

  db.select('*')
    .from('users')
    .where({ id })
    .then((users) => {
      if (users.length) {
        res.status(200).json(users[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(() => {
      res.status(500).json('some server error');
    });
};

module.exports = {
  profileHandlerGet,
};
