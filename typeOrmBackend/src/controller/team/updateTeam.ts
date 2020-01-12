import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Team} from "../../entity/Team";


export async function updateTeam(request: Request, response: Response) {

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
