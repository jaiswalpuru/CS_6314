const e = require('express');
var express = require('express');
var router = express.Router();

var monk = require('monk');

var db = monk('localhost:27017/vidzy');
var collection = db.get('videos');

// api/videos
router.get('/',function(req,res){
    collection.find({},function (err, videos){ //empty object means no filtering, returns all the documents from mongo
        if (err) throw err;
        res.json(videos);
    });
});

// api/videos/id
router.get('/:id',function(req,res){
    collection.findOne({_id:req.params.id},function (err, videos){ //empty object means no filtering, returns all the documents from mongo
        if (err) throw err;
        res.json(videos);
    });
});

//insert a new video
// api/videos
router.post('/',function(req,res){
    collection.insert({
        title: req.body.title,
        genre: req.body.title,
        description:req.body.desc,
    },function (err, video){ //empty object means no filtering, returns all the documents from mongo
        if (err) throw err;
        //if insert is successfull, return the new object as a response.
        res.json(video);
    });
});

//update the video
// api/video/id
router.put('/:id',function(req,res){
    collection.update({ _id:req.params.id }, 
    { $set : {
        title: req.body.title,
        genre: req.body.title,
        description:req.body.desc,
    }}, function (err, video){ //empty object means no filtering, returns all the documents from mongo
        if (err) throw err;
        //if insert is successfull, return the new object as a response.
        res.json(video);
    });
});

//delete the video
//api/video/id
router.delete('/:id',function(req, res) {
    collection.remove({ _id: req.params.id },function(err, video){
        if (err) throw err;
        res.json(video);
    });
});

module.exports = router;

//CRUD
// ?id=