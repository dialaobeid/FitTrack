const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Sequelize } = require('sequelize');

// Load environment variables from .env file
require('dotenv').config();

// Import the sequelize instance from connection.js
const sequelize = require('./config/connection');

const routes = require('./controllers');
const userRoutes = require('./controllers/api/userRoutes');
const workoutRoutes = require('./controllers/api/workoutRoutes');

const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({ helpers });

// configures middleware, specifying secret key, storage, and other settings
const sess = {
  secret: process.env.SESSION_SECRET || 'SuperSecretSecret',
  cookie: {
    httpOnly: true,
    maxAge: process.env.SESSION_MAX_AGE || 3600000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
app.use('/api/user', userRoutes);
app.use('/api/workouts', workoutRoutes);

// Import the User and Workout models
const User = require('./models/user');
const Workout = require('./models/workout');

// Synchronize the models in the correct order
sequelize.sync({ force: false })
  .then(() => User.sync())
  .then(() => Workout.sync())
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Unable to sync the database:', err));

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));