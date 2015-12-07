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
          'email': thisUser.email,
          'name': thisUser.profile.name,
          'picture': thisUser.profile.picture,
          'website': thisUser.profile.website,
          'facebook': thisUser.facebook,
          'twitter': thisUser.twitter,
          'linkedin': thisUser.linkedin,
          'instagram': thisUser.instagram,
          'job': thisUser.profile.job,
          'statement': thisUser.profile.statement,
          'selfThreeWords': thisUser.profile.selfThreeWords,
          'threeInterests': thisUser.profile.threeInterests,
          'sixThings': thisUser.profile.sixThings,
          'bestAdvice': thisUser.profile.bestAdvice,
          'oneBook': thisUser.profile.oneBook,
          'favoritePlace': thisUser.profile.favoritePlace
      }

      res.render('intro', {
        title: thisUser.profile.name,
        thisProfile: formatedData
      });
  
    });
};
