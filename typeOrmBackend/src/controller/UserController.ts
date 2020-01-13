import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";

class UserController{
  static getAllUsers = async (request: Request, response: Response) => {

      const userRepo = getManager().getRepository(User);
      const users = await userRepo.find({select: ["id", "username", "role"]});
      response.send(users);
  };

  static getUserById = async(request: Request, response: Response) => {

      const userRepo = getManager().getRepository(User);
      const user = await userRepo.findOne(request.params.id);
      if (!user) {
          response.status(404);
          response.end();
          return;
      }

      response.send(user);
  };

  static addUser = async(request: Request, response: Response) => {

      const userRepo = getManager().getRepository(User);
      let { username, password, role } = request.body;
      let newUser = new User();
      newUser.username = username;
      newUser.password = password;
      newUser.role = role;
      newUser.hashPassword();
      await userRepo.save(newUser);
      response.send(newUser);
  };

static deleteUser = async(request: Request, response: Response) => {

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
  };

  static updateUser = async(request: Request, response: Response) => {

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
  };
}



export default UserController;
