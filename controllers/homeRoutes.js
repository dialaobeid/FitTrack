const router = require('express').Router();
// const { Workout, Supplement, User } = require('../models');
const { Workout, User } = require('../models');

// using auth.js instead of authMiddleware.js for authentication 
const withAuth = require('../utils/auth');

// Route for the homepage
router.get('/', async (req, res) => {
  try {
    // Retrieve workout and supplement data
    const workouts = await Workout.findAll();
    // const supplements = await Supplement.findAll();

    // Render the homepage template with data
    res.render('homepage', { 
      workouts, 
      //supplements,
      logged_in: req.session.loggedin 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for viewing individual workout  
router.get('/workout/:id', async (req, res) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      res.status(404).json({ message: 'Workout not found' });
      return;
    }
    res.render('workout', { workout, logged_in: req.session.loggedin });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for user profile page (requires authentication) using utils folder
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Fetch user data based on session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Workout },
        //{ model: Supplement },
      ],
    });
    if (!userData) {
      // Return a JSON response if the user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userData.get({ plain: true });
    res.render('profile', { user, loggedin: true });
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching user data', error: err });
  }
});

// Route for rendering login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route  
  if (req.session.loggedin) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
