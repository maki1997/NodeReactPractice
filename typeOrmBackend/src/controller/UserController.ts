import {Request, Response} from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";
import {Team} from "../entity/Team";

class UserController{
  static getAllUsers = async (request: Request, response: Response) => {

      const userRepo = getManager().getRepository(User);
      const users = await userRepo.find({select: ["id","username","role"]});
      const rels = await userRepo.find({relations: ["myTeam"]});
      console.log(JSON.stringify(rels));
      console.log(JSON.stringify(users));
      response.send(rels);
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

  /*static getUserByUsername = async(request: Request, response: Response) => {
      const userRepository = getManager().getRepository(User);
      let user: User;
      user = await userRepository.findOneOrFail({ where: { username } });
      if (!user) {
          response.status(404);
          response.end();
          return;
      }

      response.send(user);
  };*/

  static addUser = async(request: Request, response: Response) => {

      const userRepo = getManager().getRepository(User);
      const teamRepo = getManager().getRepository(Team);
      let body = request.body;
      console.log(body.myTeam);
      let newTeam = new Team();
      newTeam.name = body.myTeam;
      let newUser = new User();
      newUser.username = body.username;
      newUser.password = body.password;
      newUser.role = body.role;
      newUser.hashPassword();
      newUser.myTeam = newTeam;
      await teamRepo.save(newTeam);
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
