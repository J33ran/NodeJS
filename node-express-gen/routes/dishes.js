var express = require("express");
var bodyParser = require("body-parser");
var Dishes = require('../models/dishes')
var Verify = require('./verify')

var router = express.Router();
router.use(bodyParser.json());

router.route('/')
.all(Verify.verifyOrdinaryUser, function(req,res,next) { 
  // res.writeHead(200, { 'Content-Type': 'text/plain' });
    next();
})

.get(Verify.verifyOrdinaryUser, function(req,res,next) { 
    Dishes.find({}, function (err, dish) { 
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    Dishes.create(req.body, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        var id = dish._id;

        res.writeHead(200, {
        'Content-Type': 'text/plain'
        });
        res.end('Added the dish with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Dishes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
        });
});

router.route('/:dish')
.all(Verify.verifyOrdinaryUser, function(req,res,next) {
    next();
})

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Dishes.findById(req.params.dish, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.put(Verify.verifyOrdinaryUser, function(req, res, next){
    Dishes.findByIdAndUpdate(req.params.dish, {
        $set: req.body
        }, {
            new: true
        }, function (err, dish) {
            if (err) throw err;
            res.json(dish);
        });
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    Dishes.findByIdAndRemove(req.params.dish, function (err, resp) {   
        if (err) throw err;
        res.json(resp);
    });
});

// Comments
router.route('/:dish/comments')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dish, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dish, function (err, dish) {
        if (err) throw err;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dish, function (err, dish) {
        if (err) throw err;
        for (var i = (dish.comments.length - 1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }

        dish.save(function (err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

router .route('/:dish/comments/:comment')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dish, function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.comment));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dish, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.comment).remove();
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dish, function (err, dish) {
        dish.comments.id(req.params.comment).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});
module.exports = router;
