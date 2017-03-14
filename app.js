var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var blog = require('./Blog.model');
var port = 1775;
var db = 'mongodb://localhost/blog';

mongoose.connect(db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}));

app.get('/', function(req, res) {
  res.send('happy to be here');
});

app.get('/blog', function(req, res) {
  console.log('getting blogs');
  blog.find({})
  .exec(function(err, blog) {
    if(err) {
      res.send('error occured')
    }else{
      console.log(blog);
      res.json(blog);
    }
  });
});

app.get('/blog/:id', function(req, res) {
  console.log('getting one');
  blog.findOne({
    _id:req.params.id
  })
  .exec(function(err, blog) {
    if(err) {
      res.send('error occured');
    }else{
      console.log(blog);
      res.json(blog);
    }
  });
});

app.post('/blog', function(req, res) {
  var newBlog = new blog();

  newBlog.title = req.body.title;
  newBlog.author = req.body.author;
  newBlog.category = req.body.category;

  newBlog.save(function(err, blog) {
    if(err){
      res.send('error occured')
    }else{
      console.log(blog);
      res.json(blog);
    }
  });
});

app.put('/blog/:id', function(res, req) {
  blog.findOneAndUpdate({
    _id:req.params.id
  },
  {$set:{title: req.body.title}},
    {upsert:true},
    function(err, newblog) {
      if(err){
        console.log('error occured');
      }else{
        console.log(newblog);
        res.status(204);
      }
    });
});

app.listen(port, function(){
  console.log('app listening on port' + port);
})
