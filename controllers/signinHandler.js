const signinHandlerPost = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    db.select('*')
      .from('login')
      .where({ email })
      .then((logins) => {
        const [login] = logins;
        const isMatch = bcrypt.compareSync(password, login.hash);

        if (isMatch) {
          db.select('*')
            .from('users')
            .where({ email })
            .then((users) => {
              const [user] = users;
              res.status(200).json(user);
            })
            .catch(() => res.status(500).json('server error'));
        } else {
          res.status(400).json('incorrect login data');
        }
      })
      .catch(() => res.status(400).json('incorrect login data'));
  } else {
    res.status(400).json('not enough data');
  }
};

module.exports = {
  signinHandlerPost,
};
