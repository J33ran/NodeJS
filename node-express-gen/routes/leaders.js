var express = require("express");
var bodyParser = require("body-parser");
var Leaders = require('../models/leaders')

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.all(function(req,res,next) {
    next();
})

.get(function(req,res,next){
    Leaders.find({},function (err, leader){
        if (err) throw err;
        res.json(leader);
    });
})

.post(function(req, res, next){
    Leaders.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log ("Leader created.");
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the leader with id: ' + id);
    });
})

.delete(function(req, res, next){
    Leaders.remove({}, function (err, resp) {
    if (err) throw err;
      res.json(resp);
    });
})

router.route('/:leader')
.all(function(req,res,next) {
    next();
})

.get(function(req,res,next){
    Leaders.findById(req.params.leader, function (err, dish) {
    if (err) throw err;
    res.json(dish);
  });
})

.put(function(req, res, next){
    Leaders.findByIdAndUpdate(req.params.leader, {
    $set: req.body
    }, {
      new: true
    }, function (err, dish) {
      if (err) throw err;
      res.json(dish);
    });
})

.delete(function(req, res, next){
     Leaders.findByIdAndRemove(req.params.leader, function (err, resp) {   
    if (err) throw err;
    res.json(resp);
    });
});

module.exports = router;