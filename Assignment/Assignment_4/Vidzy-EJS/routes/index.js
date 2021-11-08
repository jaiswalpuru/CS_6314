var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');
var collection = db.get('videos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/videos');
});

router.get('/videos', function(req, res, next){
  collection.find({},function(err, videos){
    if (err) throw err;
    res.render('index', {results:videos})
  });
});

router.get('/videos/new', function(req,res, next){
  res.render('new');
});

router.post('/videos/add', function(req,res, next){
  collection.insert({
    title: req.body.title,
    genre: req.body.genre,
    image:req.body.image,
    description:req.body.desc,
  },function (err, video){ //empty object means no filtering, returns all the documents from mongo
    if (err) throw err;
    //if insert is successfull, return the new object as a response.
    res.redirect('/videos');
  });
});

router.post('/videos/edit',function(req,res, next){
  var newValue = { $set : {title:req.body.title, genre:req.body.genre, image:req.body.image, description:req.body.desc}}
  try{
    collection.update( {_id:req.body.id}, newValue, function(err, result){
      if (err) throw err;
    });
  } catch(err){
    console.log(err);
  } finally {
    console.log("Error in update");
    res.redirect('/videos');
  }
});

router.post('/videos', function(req, res, next){
  collection.find({},function(err, videos){
    if (err) throw err;
    var objLen = videos.length;
    var result = []
    var title = req.body.title;
    var genre = req.body.genre;
    for (let i=0; i<objLen; i++) {
      if (title!=='' && genre!=='select'){
        if (videos[i].title.toLowerCase().includes(title.toLowerCase()) && 
        videos[i].genre.toLowerCase().includes(genre)){
          result.push(videos[i]);
        }
      }else{
        if ((title!=='' && videos[i].title.toLowerCase().includes(title.toLowerCase())) 
        || videos[i].genre.toLowerCase().includes(genre)){
          result.push(videos[i])
        }
      }
    }
    if (title==='' && genre ==='select'){
      res.redirect('/videos');
    }else{
      videos = result;
      console.log(videos);
      res.render('index', {results : videos});
    }
  });
});

router.post('/videos/:id', function(req, res, next){
  collection.remove({ _id: req.params.id },function(err, video){
    if (err) throw err;
    res.redirect('/videos');
  });
});

router.get('/videos/:id', function(req,res){
  collection.findOne({_id:req.params.id},function(err, video){
    if (err) throw err;
    res.render('show', {video : video });
  });
});


router.get('/videos/:id/edit',function(req,res){
  collection.findOne({_id:req.params.id},function(err, video) {
    res.render('edit',{video: video});
  });
});

module.exports = router;