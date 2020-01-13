import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../../entity/User";


export async function addUser(request: Request, response: Response) {


    const userRepo = getManager().getRepository(User);
    let { username, password, role } = request.body;
    let newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.role = role;
    newUser.hashPassword();
    await userRepo.save(newUser);
    response.send(newUser);
}
