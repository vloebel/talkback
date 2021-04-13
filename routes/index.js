// index.js adapted from UA Web Developer Bootcamp
// Module 18. This challenge has no front end.


const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
