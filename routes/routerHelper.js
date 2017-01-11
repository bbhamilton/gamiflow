module.exports.ensureAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()){
		return next();
	} else {
		let redirect = req.url;
		req.flash('error', 'You are not logged in.');
		res.redirect('/login/?redirect=' + redirect);
	}
};

module.exports.isAdmin = (req, res, next) => {
  if(req.session.passport.user.isAdmin) {
		return next();
	} else {
    //TODO - send information to administrator about this try
		req.flash('error', 'You are not allowed to access this page.');
		res.redirect('/');
	}
};
