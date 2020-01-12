import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Team} from "../../entity/Team";


export async function getTeamById(request: Request, response: Response) {

  const teamRepo = getManager().getRepository(Team);
  const team = await teamRepo.findOne(request.params.id);
  if (!team) {
      response.status(404);
      response.end();
      return;
  }
  response.send(team);
}
