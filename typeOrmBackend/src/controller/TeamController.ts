import BaseController from "./BaseController";
import express from "express";
import {getManager} from "typeorm";
import {Team} from "../entity/Team";

class TeamController extends BaseController{

  constructor(router: express.Router, protected baseRoute: string = "") {
      super(router, baseRoute);
  }

  protected registerRoutes(): void {

  this.get("",async(request,response) => {

      const teamRepo = getManager().getRepository(Team);
      const teams = await teamRepo.find()
      response.send(teams);
  });

  this.get(":id",async(request,response) => {

    const teamRepo = getManager().getRepository(Team);
    const team = await teamRepo.findOne(request.params.id);
    if (!team) {
        response.status(404);
        response.end();
        return;
    }
    response.send(team);
  });

  this.get("teamName/:teamName",async(request,response) => {
      const teamRepo = getManager().getRepository(Team);
      const param = request.params.teamName;
      const team = await teamRepo.query("Select * from team where name='"+param+"'");
      console.log(team);
      if (!team) {
          response.status(404);
          response.end();
          return;
      }

      response.send(team);
  });

  this.post("",async(request,response) => {

      console.log("addteamstart");
      const teamRepo = getManager().getRepository(Team);
      const newTeam = teamRepo.create(request.body);
      await teamRepo.save(newTeam);
      response.send(newTeam);
  });

  this.delete(":id",async(request,response) => {

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
  });

  this.put(":id",async(request,response) => {

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
  });
}
}
export default TeamController;
