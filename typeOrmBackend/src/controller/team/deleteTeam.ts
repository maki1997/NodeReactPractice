import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Team} from "../../entity/Team";


export async function deleteTeam(request: Request, response: Response) {

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
}
