var secrets = require('../config/secrets');

var User = require('../models/User');

/**
 * GET /intro/:id
 * 
 */
exports.getIntro = function(req, res) {
  // get all the users
 
    User.findById(req.params.id, function(err, thisUser) {
      if (err) throw err;

      var formatedData = {
          'name': thisUser.profile.name,
          'picture': thisUser.profile.picture
      }

      res.render('intro', {
        title: thisUser.profile.name,
        thisProfile: formatedData
      });
  
    });
};
