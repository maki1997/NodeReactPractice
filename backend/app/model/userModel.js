'user strict';
var sql = require('./db.js');

var User = function(user){
    this.username = user.username;
    this.password = user.password;
};

User.createUser = function (newUser, result) {
        sql.query("INSERT INTO users set ?", newUser, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};

User.getAllUsers = function (result) {
        sql.query("Select * from users", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('users : ', res);

                 result(null, res);
                }
            });
};

User.getUserById = function (userId, result) {
        sql.query("Select * from users where id = ?", userId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};


User.getUserByUsername = function (username, result) {
        sql.query("Select * from users where username = ?", username, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                    console.log("get successful")

                }
            });
};

/*User.login = function(req, res, next) {
  sql.query(`SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`, function (err, res)){
    if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Username or password is incorrect!'
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({
                username: result[0].username,
                userId: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );

            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });


  }
  return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });

}*/

module.exports= User;
