    var express = require("express");
    var bodyParser = require("body-parser");
    var leaders = require('../models/leaders')

    var router = express.Router();
    router.use(bodyParser.json());

    router.route('/')
    .all(function(req,res,next) {
        next();
    })

    .get(function(req,res,next){
        leaders.find({},function (err, leader){
            if (err) throw err;
            res.json(leader);
        });
    })

    .post(function(req, res, next){
        leaders.create(req.body, function (err, leader) {
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
                res.end('Deleting all leaders');
    });

    router.route('/:leader')
    .all(function(req,res,next) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
                    next();
    })

    .get(function(req,res,next){
                res.end('Will send details of the leader: ' + req.params.leader +' to you!');
    })

    .put(function(req, res, next){
                res.write('Updating the leader: ' + req.params.leader + '\n');
                    res.end('Will update the leader: ' + req.body.name + 
                                    ' with details: ' + req.body.description);
    })

    .delete(function(req, res, next){
                res.end('Deleting leader: ' + req.params.leader);
    });

    module.exports = router;