'user strict';
var sql = require('./db.js');

var Team = function(team){
    this.team = team.team;
};
Team.createTeam = function (newTeam, result) {
        sql.query("INSERT INTO teams set ?", newTeam, function (err, res) {

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
Team.getTeamById = function (teamId, result) {
        sql.query("Select team from teams where id = ? ", teamId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);

                }
            });
};
Team.getAllTeams = function (result) {
        sql.query("Select * from teams", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('teams : ', res);

                 result(null, res);
                }
            });
};

Team.updateById = function(id, team, result){
  sql.query("UPDATE teams SET team = ? WHERE id = ?", [team.team, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{
             result(null, res);
                }
            });
};

Team.remove = function(id, result){
     sql.query("DELETE FROM teams WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{

                 result(null, res);
                }
            });
};

module.exports= Team;
