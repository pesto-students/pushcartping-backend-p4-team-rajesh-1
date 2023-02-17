var express = require('express');
var router = express.Router();

/* GET vendors listing. */
router.get('/all', function (req, res, next) {
  res.send('need to send all vendors list');
});

module.exports = router;
