exports.index = function(req, res){
  articleProvider.findAll(function(error, docs){
    res.render('index', {
      title: 'Blog',
      articles: docs
    })
  });
};

exports.new = function(req, res){
  res.render('blog_new', {
    title: 'New Post'
  })
};

exports.create = function(req, res){
  articleProvider.save({
    title: req.param('title'),
    body: req.param('body')
  }, function(error, docs){
    res.redirect('/')
  });
};

exports.show = function(req, res){
  articleProvider.findById(req.params.id, function(error, article){
    res.render('blog_show.jade', {
      title: article.title,
      article: article
    })
  });
};