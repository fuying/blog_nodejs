var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ArticleProvider = function(host, port) {
	this.db = new Db('blog-nodejs', new Server("127.0.0.1", 27017, {auto_reconnect: true}, {}));
	this.db.open(function(){});
};

ArticleProvider.prototype.getCollection = function(callback) {
	this.db.collection('articles', function(error, article_collection){
		if(error) callback(error);
		else callback(null, article_collection);
	});
};

ArticleProvider.prototype.findAll = function(callback) {
	this.getCollection(function(error, article_collection) {
		if(error) callback(error);
		else {
			article_collection.find().toArray(function(error, results) {
				if (error) callback(error);
				else callback(null, results);
			});
		}
	});
};

ArticleProvider.prototype.findById = function(id, callback) {
	this.getCollection(function(error, article_collection) {
		if(error) callback(error);
		else {
			article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.creatFromHexString(id)}, function(error, result){
				if(error) callback(error);
				else callback(null, result)
			});
		}
	});
};

ArticleProvider.prototype.save = function(articles, callback) {
	this.getCollection(function(error, article_collection){
		if(error) callback(error);
		else {
			if(typeof(articles.length) == "undefined")
				articles = [articles];

			for( var i =0;i< articles.length;i++ ) {
					article = articles[i];
					article.created_at = new Date();
					if( article.comments === undefined ) article.comments = [];
					for(var j =0;j< article.comments.length; j++) {
						article.comments[j].created_at = new Date();
					}
				}
			article_collection.insert(articles, function(){
				callback(null, articles);
			});
		}
	});
};

exports.ArticleProvider = ArticleProvider;