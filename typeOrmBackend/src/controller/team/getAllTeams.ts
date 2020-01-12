import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Team} from "../../entity/Team";


export async function getAllTeams(request: Request, response: Response) {

    const teamRepo = getManager().getRepository(Team);
    const teams = await teamRepo.find()
    response.send(teams);
}
