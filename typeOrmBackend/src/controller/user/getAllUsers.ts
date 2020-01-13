import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../../entity/User";


export async function getAllUsers(request: Request, response: Response) {

    const userRepo = getManager().getRepository(User);
    const users = await userRepository.find({select: ["id", "username", "role"]});
    response.send(users);
}
