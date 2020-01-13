import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Team} from "../entity/Team";

class TeamController{

  static getAllTeams = async(request: Request, response: Response) => {

      const teamRepo = getManager().getRepository(Team);
      const teams = await teamRepo.find()
      response.send(teams);
  };

  static getTeamById = async(request: Request, response: Response) => {

    const teamRepo = getManager().getRepository(Team);
    const team = await teamRepo.findOne(request.params.id);
    if (!team) {
        response.status(404);
        response.end();
        return;
    }
    response.send(team);
  };

  static addTeam = async(request: Request, response: Response) => {

      console.log("addteamstart");
      const teamRepo = getManager().getRepository(Team);
      const newTeam = teamRepo.create(request.body);
      await teamRepo.save(newTeam);
      response.send(newTeam);
  };

  static deleteTeam = async(request: Request, response: Response) => {

      const teamRepo = getManager().getRepository(Team);
      const team = await teamRepo.findOne(request.params.id);
      if (!team) {
          response.status(404);
          response.end();
          return;
      }else{
        teamRepo.remove(team);
      }

      response.send("deleted team" + JSON.stringify(team));
  };

  static updateTeam = async(request: Request, response: Response) => {

      const teamRepo = getManager().getRepository(Team);
      const team = await teamRepo.findOne(request.params.id);
      if (!team) {
          response.status(404);
          response.end();
          return;
      }else{
        if(request.body.name){
          team.name = request.body.name;
        }
        teamRepo.save(team);
      }


      response.send(team);
  }
}
export default TeamController;
