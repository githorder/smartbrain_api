const registerHandlerPost = (db, bcrypt) => (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  if (name && email && password) {
    db.transaction((trx) => {
      return trx
        .insert({
          email,
          hash,
        })
        .into('login')
        .returning('email')
        .then((emails) => {
          return trx('users')
            .insert(
              {
                name,
                email: emails[0],
                joined: new Date(),
              },
              '*'
            )
            .then((users) => {
              res.status(200).json(users[0]);
            })
            .catch(() => {
              res.status(400).json('server error');
            });
        })
        .catch(() => {
          res.status(400).json('user already exists');
        });
    });
  } else {
    res.status(400).json('no enough data provided');
  }
};

module.exports = {
  registerHandlerPost,
};
