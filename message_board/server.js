var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

mongoose.connect('mongodb://localhost/message_board');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
 name:{type:String, required:true},
 text: {type: String, required: true },
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });

var CommentSchema = new mongoose.Schema({
 _post: {type: Schema.Types.ObjectId, ref: 'Post'},
 name:{type:String, required:true},
 text: {type: String, required: true }
}, {timestamp: true });

var Post = mongoose.model('Post', PostSchema);
var Comment = mongoose.model('Comment', CommentSchema);


app.get('/', function(req, res) {
  Post.find({}).populate('comments').exec(function(err, posts){
    console.log(posts);
    res.render('index',{posts:posts});
  });
});
app.post('/message_board', function(req, res) {
  console.log(req.body);
  Post.create(req.body)
  .then(function(post) {
    res.redirect('/');
  })
  .catch(function(err) {
    console.log(err);
  });
});
app.post('/create_comment', function(req,res) {
  Comment.create(req.body)
  .then(function(comment) {
    console.log(comment);
    return Post.findById(comment._post)
    .then(function(post) {
      post.comments.push(comment);
      post.save(function() {
        res.redirect('/');
      });
      // console.log(post);
    })
  })
  .catch(function(err) {
    console.log(err);
  });
});
app.listen(8000, function() {
    console.log("listening on port 8000");
})
