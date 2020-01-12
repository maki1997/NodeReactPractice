import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../../entity/User";


export async function updateUser(request: Request, response: Response) {

    const userRepo = getManager().getRepository(User);
    const user = await userRepo.findOne(request.params.id);
    if (!user) {
        response.status(404);
        response.end();
        return;
    }else{
      if(request.body.username){
        user.username = request.body.username;
      }
      if(request.body.password){
        user.password = request.body.password;
      }
      userRepo.save(user);
    }


    response.send(user);
}
