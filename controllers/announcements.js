var secrets = require('../config/secrets');
var Article = require('../models/Article');
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
			allArticles: articles
		});

	});
  
};
exports.getArticle = function(req, res) {
	res.render('article', {
	    title: 'Account Management',
	  });
  
};
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
        var thisArticle = new Article({
	      title: req.body.title,
		  content: req.body.content,
		  author: user.profile.name,
		  timestamp: Date()
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
