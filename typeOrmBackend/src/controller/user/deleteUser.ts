import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../../entity/User";


export async function deleteUser(request: Request, response: Response) {

    const userRepo = getManager().getRepository(User);
    const user = await userRepo.findOne(request.params.id);
    if (!user) {
        response.status(404);
        response.end();
        return;
    }else{
      userRepo.remove(user);
    }

    response.send("deleted user" + JSON.stringify(user));
}
