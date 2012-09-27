
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , blog = require('./routes/blog')
  , comment = require('./routes/comment');

var ArticleProvider = require("./articleprovider-mongodb").ArticleProvider;

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

articleProvider = new ArticleProvider();

app.get('/', blog.index);

app.get('/blog/new', blog.new);

app.post('/blog/new', blog.create);

app.get('/blog/:id', blog.show);

app.post('/blog/addComment', comment.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
