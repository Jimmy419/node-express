var express = require('express');
var router = express.Router();
var userModel = require("../models/UserModel");

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/zhuce',function(req,res){
	nicheng = req.body['nicheng'];
	console.log("post:"+nicheng);
	userModel.zhuce(req,res);
})

module.exports = router;
