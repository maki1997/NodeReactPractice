import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Team} from "../../entity/Team";


export async function addTeam(request: Request, response: Response) {


    const teamRepo = getManager().getRepository(Team);
    const newTeam = teamRepo.create(request.body);
    await teamRepo.save(newTeam);
    response.send(newTeam);
}
