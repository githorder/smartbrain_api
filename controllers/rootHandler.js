const rootHandlerGet = (db) => (req, res) => {
  db('users')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch('some server error');
};

module.exports = {
  rootHandlerGet,
};
