const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT;

const { rootHandlerGet } = require('./controllers/rootHandler');
const { signinHandlerPost } = require('./controllers/signinHandler');
const { registerHandlerPost } = require('./controllers/registerHandler');
const { profileHandlerGet } = require('./controllers/profileHandler');
const {
  imageHandlerPut,
  imageHandlerPost,
} = require('./controllers/imageHandler');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', rootHandlerGet(db));
app.post('/signin', signinHandlerPost(db, bcrypt));
app.post('/register', registerHandlerPost(db, bcrypt));
app.get('/profile/:id', profileHandlerGet(db));
app.put('/image', imageHandlerPut(db));
app.post('/image', imageHandlerPost());

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
