var express = require('express');
var admin = require('firebase-admin');
var router = express.Router();

var fs = admin.firestore();

/* GET users listing. */
router.get('/create', function(req, res, next) {
  fs.collection('/activities').add({
      title: "Anotha one"
  })
  .then(s => {
    res.send("Success");
  })
  .catch(err => {
    res.send("oof")
  })
  
});

module.exports = router;
