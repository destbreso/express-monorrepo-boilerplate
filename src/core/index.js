var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /index:
 *   get:
 *     summary: Get home page
 *     description: Get home page
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'JSONPlaceholder Express API' });
});

module.exports = router;
