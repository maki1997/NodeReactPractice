import express from "express";
import {getManager} from "typeorm";
import {Team} from "../entity/Team";
import {Player} from "../entity/Player";
import BaseController from "./BaseController";

export class PlayerController extends BaseController{

  constructor(router: express.Router, protected baseRoute: string = "") {
      super(router, baseRoute);
  }

  protected registerRoutes(): void {
  // get all players
  this.get("",async (request,response) => {

      const playerRepo = getManager().getRepository(Player);
      const players = await playerRepo.find({relations: ["team"]});
      response.send(players);
  });


  // add player
  this.post("",async(request,response) => {
      const teamRepo = getManager().getRepository(Team);
      const playerRepo = getManager().getRepository(Player);
      const body = request.body;
      const teamName = body.teamName;
      let newPlayer = new Player();
      let eteam: Team;
      try {
        const teamRepo = getManager().getRepository(Team);
        const team = await teamRepo.findOne({name: teamName});
        eteam = team;
        if (!team) {
            response.status(404);
            response.end();
            return;
        }
      } catch (error) {
        console.log("error");
      }
      newPlayer.firstname = body.firstname;
      newPlayer.lastname = body.lastname;
      newPlayer.team = eteam;
      await playerRepo.save(newPlayer);
      response.send(newPlayer);
  });


}

}
export default PlayerController;
