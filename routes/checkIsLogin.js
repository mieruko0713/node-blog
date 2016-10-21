// 已经登录
function login(req,res,next) {
	if(req.session.user) {
		req.flash("error","抱歉！您已经登录！");
		return res.redirect("back");
	}
	next();
}

// 未登录
function notLogin(req,res,next) {
	if(!req.session.user) {
		req.flash("error","抱歉，您还没有登录！");
		return res.redirect("/login");
	}
	next();
}

exports.login = login;
exports.notLogin = notLogin;
