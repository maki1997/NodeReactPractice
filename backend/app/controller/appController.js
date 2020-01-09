'use strict';

var Team = require('../model/appModel.js');

exports.list_all_teams = function(req, res) {
  Team.getAllTeams(function(err, team) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', team);
    res.send(team);
  });
};



exports.create_a_team = function(req, res) {
  var new_team = new Team(req.body);
   if(!new_team.team){

            res.status(400).send({ error:true, message: 'Please provide team name' });

        }
else{

  Team.createTeam(new_team, function(err, team) {

    if (err)
      res.send(err);
    res.json(team);
  });
}
};


exports.read_a_team = function(req, res) {
  Team.getTeamById(req.params.teamId, function(err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};


exports.update_a_team = function(req, res) {
  Team.updateById(req.params.teamId, new Team(req.body), function(err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};


exports.delete_a_team = function(req, res) {
  Team.remove( req.params.teamId, function(err, team) {
    if (err)
      res.send(err);
    res.json({ message: 'Team successfully deleted' });
  });
};
