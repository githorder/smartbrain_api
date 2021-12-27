const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT;

const { rootHandlerGet } = require('./controllers/rootHandler');
const { signinHandlerPost } = require('./controllers/signinHandler');
const { registerHandlerPost } = require('./controllers/registerHandler');
const { profileHandlerGet } = require('./controllers/profileHandler');
const { imageHandlerPut } = require('./controllers/imageHandler');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: '5432',
    user: 'diyorbaynazarov',
    password: 'Universe2000@',
    database: 'smartbrain',
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

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
