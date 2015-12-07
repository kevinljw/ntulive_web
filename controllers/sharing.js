var secrets = require('../config/secrets');
var moment = require('moment');
var User = require('../models/User');
var nodemailer = require("nodemailer");
var Share = require('../models/Share');
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
exports.getSharing = function(req, res) {
  Share.find({}, function(err, shares) {
    if (err) throw err;
    res.render('sharing', {
    	title: 'Sharing',
    	shareList: shares.reverse()
  	});
  });
  
};
exports.getFile = function(req, res) {
	var fileName = req.params.id
    var path = './public/uploadFiles/' + fileName;
	res.download(path);
};

exports.postSharingFiles = function(req, res, next) {
  	console.log('req.files'); //form fields
  	console.log(req.files); //form files
  	console.log(req.files.filename);
  	console.log(req.body.title);
  	console.log(req.body.description);

  	var filenameArr = [];
	  var filepathArr = [];

    User.findById(req.params.id, function(err, thisUser) {
        if (!thisUser) {
          req.flash('errors', { msg: 'No account with that id exists.' });
          return res.redirect('/');
        }
      	req.files.forEach(function(eachFILE, index){
      		filenameArr.push(eachFILE.filename);
      		filepathArr.push(eachFILE.originalname);
      		if(index==req.files.length-1){
      			var newShare = new Share({
    		        upload_user: thisUser.profile.name,
                upload_userId: req.params.id,
    		        filespath: filepathArr,
    		        filesname: filenameArr,
    		        timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
                title: req.body.title,
                description: req.body.description
    		    });
    		    newShare.save(function(err) {
    		    	if(err){
    		    		req.flash('errors', { msg: 'Files Upload Error'});
    		    	}
    		    	else{
    		    		req.flash('info', { msg: 'Files uploaded.' });
    		    	}
    	            res.redirect('/sharing');
    		    	
    	        });
    		 //    console.log(newShare);
    			// req.flash('success', { msg: 'Files uploaded.' });
    		 //    res.redirect('/sharing');
      		}
      	});  	
    });
};

