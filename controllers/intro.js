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
          'statement': thisUser.profile.statement.replace(/\r?\n/g, '<br />'),
          'selfThreeWords': thisUser.profile.selfThreeWords.replace(/\r?\n/g, '<br />'),
          'threeInterests': thisUser.profile.threeInterests.replace(/\r?\n/g, '<br />'),
          'sixThings': thisUser.profile.sixThings.replace(/\r?\n/g, '<br />'),
          'bestAdvice': thisUser.profile.bestAdvice.replace(/\r?\n/g, '<br />'),
          'oneBook': thisUser.profile.oneBook.replace(/\r?\n/g, '<br />'),
          'favoritePlace': thisUser.profile.favoritePlace.replace(/\r?\n/g, '<br />')
      }

      res.render('intro', {
        title: thisUser.profile.name,
        thisProfile: formatedData
      });
  
    });
};
