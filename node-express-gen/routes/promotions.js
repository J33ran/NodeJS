var express = require("express");
var bodyParser = require("body-parser");
var Promotions = require('../models/promotions')

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.all(function(req,res,next) {
    next();
})

.get(function(req,res,next){
    Promotions.find({},function (err, promotion){
        if (err) throw err;
        res.json(promotion);
    });
})

.post(function(req, res, next){
    Promotions.create(req.body, function (err, promotion) {
        if (err) throw err;
        console.log ("promotion created.");
        var id = promotion._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the promotion with id: ' + id);
    });
})

.delete(function(req, res, next){
    Promotions.remove({}, function (err, resp) {
    if (err) throw err;
      res.json(resp);
    });
})

router.route('/:promotion')
.all(function(req,res,next) {
    next();
})

.get(function(req,res,next){
    Promotions.findById(req.params.promotion, function (err, dish) {
    if (err) throw err;
    res.json(dish);
  });
})

.put(function(req, res, next){
    Promotions.findByIdAndUpdate(req.params.promotion, {
    $set: req.body
    }, {
      new: true
    }, function (err, dish) {
      if (err) throw err;
      res.json(dish);
    });
})

.delete(function(req, res, next){
     Promotions.findByIdAndRemove(req.params.promotion, function (err, resp) {   
    if (err) throw err;
    res.json(resp);
    });
});

module.exports = router;