var secrets = require('../config/secrets');
var moment = require('moment');
var Article = require('../models/Article');
var Share = require('../models/Share');
var User = require('../models/User');
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: secrets.sendgrid.user,
    pass: secrets.sendgrid.password
  }
});

/**
 * GET /contact
 * Contact form page.
 */
exports.getAnnouncements = function(req, res) {
	Article.find({},function(err, articles) {
    	if (err) throw err;
		res.render('announcements', {
			title: 'Announcements',
			allArticles: articles.reverse()
		});

	});
  
};
exports.getArticle = function(req, res) {
	Share.find({},function(err, shares) {
		if (err) throw err;
		Article.find({},function(err2, articles) {
	    	if (err2) throw err2;
			res.render('article', {
			    title: 'Account Management',
			    allArticles: articles,
			    allShares: shares
			  });
		});
  	});
};
exports.postDeleteShare = function(req, res, next) {
	Share.remove({"_id": req.params.id}, function(err, article) {
		if (!article) {
          req.flash('errors', { msg: 'No account with that id exists.' });
          return res.redirect('/');
        }
        req.flash('success', { msg: 'Done.' });
	    res.redirect('/article');
        
	});
}
exports.postDeleteArticle = function(req, res, next) {
	Article.remove({"_id": req.params.id}, function(err, article) {
		if (!article) {
          req.flash('errors', { msg: 'No account with that id exists.' });
          return res.redirect('/');
        }
        req.flash('success', { msg: 'Done.' });
	    res.redirect('/article');
        
	});
}
exports.postNewArticle = function(req, res, next) {
	req.assert('title', 'Title must be at least 1 characters long').len(1);
	req.assert('content', 'Content must be at least 1 characters long').len(1);
	var errors = req.validationErrors();

	if (errors) {
	    req.flash('errors', errors);
	    return res.redirect('/article');
	}
	User.findById(req.params.id, function(err, user) {
        if (!user) {
          req.flash('errors', { msg: 'No account with that id exists.' });
          return res.redirect('/');
        }
        var LinkIsOn = false;
        var videoLink = req.body.link;
        
        if(videoLink != "" && (videoLink.indexOf("vimeo.com")>-1 || videoLink.indexOf("youtu.be")>-1 || videoLink.indexOf("youtube")>-1)){
        	videoLink = videoLink.replace("watch?v=", "v/");
        	videoLink = videoLink.replace("youtu.be", "www.youtube.com/v");
        	videoLink = videoLink.replace("vimeo.com", "player.vimeo.com/video");
        	// https://player.vimeo.com/video/10881014
        	console.log(videoLink);
        	LinkIsOn = true;
        }
        var thisArticle = new Article({
	      title: req.body.title,
		  content: req.body.content,
		  author: user.profile.name,
		  authorId: req.params.id,
		  timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
		  link: LinkIsOn?videoLink:''
	    });
	    console.log(thisArticle);
	    thisArticle.save(function(err) {
	        if (err) {
	          return next(err);
	        }
	        req.flash('success', { msg: 'Done.' });
	        res.redirect('/article');
	    });
	    
    });
	
};
