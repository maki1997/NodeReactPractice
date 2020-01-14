import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Team} from "../entity/Team";
import {Player} from "../entity/Player";

class PlayerController{

  static getAllPlayers = async(request: Request, response: Response) => {

      const playerRepo = getManager().getRepository(Player);
      const players = await playerRepo.find({relations: ["team"]});
      response.send(players);
  };



  static addPlayer = async(request: Request, response: Response) => {
      const teamRepo = getManager().getRepository(Team);
      const playerRepo = getManager().getRepository(Player);
      const body = request.body;
      const teamName = body.teamName;
      console.log("team name dosao"+teamName);
      let newPlayer = new Player();
      let existingTeam: Team;
      try {
        const teamRepo = getManager().getRepository(Team);
        const team = await teamRepo.query("Select * from team where name='"+teamName+"'");
        existingTeam = team;
        console.log(team);
        if (!team) {
            response.status(404);
            response.end();
            return;
        }
      } catch (error) {
        console.log("error");
      }
      console.log("esese "+existingTeam);
      newPlayer.firstname = body.firstname;
      newPlayer.lastname = body.lastname;
      newPlayer.team = existingTeam;
      console.log(JSON.stringify(newPlayer));
      await playerRepo.save(newPlayer);
      response.send(newPlayer);
  };


}
export default PlayerController;
