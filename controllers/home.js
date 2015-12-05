/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};
exports.indexHidden = function(req, res) {
  res.render('homeHidden', {
    title: 'Home'
  });
};