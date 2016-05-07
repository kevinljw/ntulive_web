var secrets = require('../config/secrets');

var User = require('../models/User');

var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: secrets.sendgrid.user,
    pass: secrets.sendgrid.password
  }
});

function getFormatedData(showStatus,callback){

  // var formatedUserData=[];
  // console.log(showStatus);
  var splitArr = showStatus.split('_');
  // console.log(splitArr);

  if(splitArr.length>1){
    User.find({$or: [{"profile.status": splitArr[0], "profile.statusYear": splitArr[1]},{"profile.status2": splitArr[0], "profile.status2Year": splitArr[1]}]}, null, {sort: {"profile.name": 1}}, function(err, users) {
      if (err) throw err;

          // console.log("formatedUserData: "+formatedUserData);
          // console.log('16',users)
          callback(users); 
    });
  }
  else{
    User.find({$or: [{"profile.status": showStatus},{"profile.status2": showStatus}]}, null, {sort: {"profile.name": 1}}, function(err, users) {
      if (err) throw err;
          // console.log("formatedUserData: "+formatedUserData);
          // console.log(users)
          callback(users); 
          
    });
  }
  
} 
/**
 * GET /people
 * People form page.
 */
exports.getPeople = function(req, res) {
  // get all the users
  // console.log("getPeople");
  getFormatedData("fellow",function(formatedUserData){
    res.render('people', {
      title: 'People',
      userData: formatedUserData
    });
  });
  
};
exports.getPeopleId = function(req, res) {
  // get all the users
  // console.log("getPeople");
  // console.log(req.params.id);

  getFormatedData(req.params.id,function(formatedUserData){
    res.render('people/'+req.params.id, {
      title: 'People',
      userData: formatedUserData,
      // yearFlg: req.params.id.indexOf('fellow')>-1?false:true
    });
  });
  
};

/**
 * POST /people
 * Send a people form via Nodemailer.
 */
exports.postPeople = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  var from = req.body.email;
  var name = req.body.name;
  var body = req.body.message;
  var to = 'your@email.com';
  var subject = 'Contact Form | Hackathon Starter';

  var mailOptions = {
    to: to,
    from: from,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(err) {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
};