import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../../entity/User";


export async function addUser(request: Request, response: Response) {


    const userRepo = getManager().getRepository(User);
    const newUser = userRepo.create(request.body);
    await userRepo.save(newUser);
    response.send(newUser);
}
