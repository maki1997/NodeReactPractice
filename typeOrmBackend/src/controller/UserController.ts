import BaseController from "./BaseController";
import express from "express";
import {getManager} from "typeorm";
import {User} from "../entity/User";
import {Team} from "../entity/Team";
import {UserCustomRepository} from "../repository/UserCustomRepository"

export class UserController extends BaseController{

  constructor(router: express.Router, protected baseRoute: string = "") {
      super(router, baseRoute);
  }

  protected registerRoutes(): void {
  // get all users
  this.get("",async(request,response) => {

      const userRepo = getManager().getRepository(User);
      const users = await userRepo.find({select: ["id","username","role"]});
      const rels = await userRepo.find({relations: ["myTeam"]});
      response.send(rels);
  });
  // get user by id
  this.get(":id",async(request,response) => {

      const userRepo = getManager().getRepository(User);
      const user = await userRepo.findOne(request.params.id);
      if (!user) {
          response.status(404);
          response.end();
          return;
      }

      response.send(user);
  });
  // get user by username
  this.get("username/:username",async(request,response) => {
      const userRepo = getManager().getRepository(User);
      const param = request.params.username;
      const user = await userRepo.query("Select * from user where username like '"+param+"'");
      console.log(request.params.username);
      console.log(user);
      if (!user) {
          response.status(404);
          response.end();
          return;
      }

      response.send(user);
  });
  // add user
  this.post("",async(request,response) => {

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
  });
  // delete user
  this.delete(":id",async(request,response) => {

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
  });
  // edit user
  this.put(":id",async(request,response) => {

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
  });
}
}



export default UserController;
