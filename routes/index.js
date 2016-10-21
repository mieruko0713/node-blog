var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var crypto = require("crypto");
var model = require("../models/models");
var User = model.User;

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('index', {
  	title: '主页',
  	user:req.session.user,
  	 arts: [{
            title: 'nodeJS入门',
            tags: 'nodeJS',
            author: '...',
            createTime: '',
            content: '...'
        },{
            title: 'nodeJS入门',
            tags: 'nodeJS',
            author: '...',
            createTime: '',
            content: '...'
        },{
            title: 'nodeJS入门',
            tags: 'nodeJS',
            author: '...',
            createTime: '',
            content: '...'
        }]
    });
});

router.get("/login",function(req,res,next) {
  return res.render("login",{title:"login",user:req.session.user});
});

router.post("/login",function(req,res,next) {
  var username = req.body.username,
      password = req.body.password;
  User.findOne({username:username},function(err,user) {
  	if(err) {
  		req.flash("error",err);
  		return redirect("/login");
  	} else {
  		var md5 = crypto.createHash("md5");
  		md5password = md5.update(password).digest("hex");
  		if(md5password === user.password) {
  			req.session.user = user;
  			return res.redirect("/");
  		}
  		else {
  			req.flash("用户名和密码不一致!");
  			return res.redirect("/login");
  		}
  	}
  });
});

router.get("/logout",function(req,res,next){
	req.session.user = null;
	return res.render("login",{title:"login",user:req.session.user});
});

router.get("/reg",function(req,res,next){
	return res.render("register",{title:"主页",user:req.session.user});
});

router.post("/reg",function(req,res,next){
	var username = req.body.username,
	    password = req.body.password,
	    passwordRepeat = req.body.passwordRepeat;
	if(password != passwordRepeat) {
		req.flash("error","两次输入的密码不一致");
		return res.redirect("/reg");
	}
	User.findOne({username:username},function(err,user){
		if(err) {
			req.flash("error",err);
			return res.redirect("/reg");
		}
		if(user) {
			req.flash("error","用户名已经存在!");
			return res.redirect("/reg");
		}
		var md5 = crypto.createHash("md5");
	md5password = md5.update(password).digest("hex");
	var newUser = new User({
		username:username,
		password:md5password,
		email:req.body.email
	});
	newUser.save(function(err,doc){
		if(err) {
			req.flash("error",err);
			return res.redirect("/reg");
		}
		req.flash("success","注册成功!");
		newUser.password = null;
		delete newUser.password;
		req.session.user = newUser;
		return res.redirect("/");
	});
	});
	
});
router.post("/post",function(req,res,next) {
	var data = new Article({
		title:req.body.title,
		author:req.session.user.username,
		tag:req.body.tag,
		content:req.body.content
	});
	data.save(function(err,doc){
		if(err) {
			req.flash("error",err);
			return res.redirect("/post",{error:req.flash("error").toString()});
		}
		req.flash("success","文章发表成功!");
	});
});
router.get("/remove/:_id",function(req,res,next){
	// req.params处理/:xxx形式的get post请求
	Article.remove({_id:req.params._id},function(err){
		if(err) {
			req.flash("error",err);
		} else {
			req.flash("success","文章删除成功");
		}
		return res.redirect("back");
	});
});
router.get("/edit/:_id",function(req,res,next) {
	Article.findOne({_id:req.params._id},function(err,art) {
		if(err) {
			req.flash("error",err);
			return res.redirect("back");
		}
		return res.render("edit",{
			title:"编辑",
			art:art
		});
	});
});
// 编辑文章
router.post("/edit/:_id",function(req,res,next){
	// mongoose 的update 方法检索参数并且返回修改结果
	Article.update({_id:req.params._id},{
		title:req.body.title,
		tag:req.body.tag,
		content:req.body.content,
		createTime:Date.now()
	},function(err,art){
		if(err) {
			req.flash("error",err);
			return res.redirect("back");
		}
		req.flash("success","文章编辑成功!");
		return res.redirect("/u/"+req.session.user.username);
	});
});
// 查询文章
router.get("/search",function(req,res,next) {
	//req.query 获取get 请求中url后面的参数 构造正则对象
	var query = req.query.title,
		title = new RegExp(query,"i");
	Article.find({title:title})
	        .sort("-createTime")
	        .exec(function(err,arts){
	        	if(err) {
	        		req.flash("error",err);
	        		return res.redirect("/");
	        	}
	        	res.render("search",{
	        		title:"查询结果",
	        		arts:arts
	        	});
	        });
});
module.exports = router;
