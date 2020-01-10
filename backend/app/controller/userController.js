'use strict';

var User = require('../model/userModel.js');
const { sign } = require("jsonwebtoken");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

exports.list_all_users = function(req, res) {
  User.getAllUsers(function(err, user) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });
};

exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);
  const salt = genSaltSync(10);
  new_user.password = hashSync(new_user.password, salt);
   if(!new_user.username || !new_user.password){

            res.status(400).send({ error:true, message: 'Please provide username and password' });

        }
else{

  User.createUser(new_user, function(err, user) {

    if (err)
      res.send(err);
    res.json(user);
  });
}
};

exports.read_a_user = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.read_a_user_by_username = function(req, res) {
  User.getUserByUsername(String(req.params.username), function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.login = function(req,res){
  const body = req.body;
  User.getUserByUsername(body.username,function(err,user){
    console.log(user);
    if (err) {
        console.log(err);
      }
    if (!user) {
      return res.json({
        success: 0,
        data: "Invalid email or password"
        });
    }
    var jsonUser = JSON.stringify(user[0]);
    console.log("json user" + jsonUser + "json body" + JSON.stringify(body));
    const result = compareSync(body.password, user[0].password);
      if (result) {
        user.password = undefined;
        const jsontoken = sign({ result: user }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });} else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
  });
};
