import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import UserController from "../controller/UserController";
import AuthController from "../controller/AuthController";
import TeamController from "../controller/TeamController";
import PlayerController from "../controller/PlayerController";

  const router = Router();


  // auth
  router.post("/login", AuthController.login);
  router.post("/change-password" ,[checkJwt, checkRole(["ADMIN","USER"])] , AuthController.changePassword);
  //teams
  router.get("/teams",[checkJwt, checkRole(["ADMIN","USER"])] ,TeamController.getAllTeams);
  router.post("/teams",[checkJwt, checkRole(["ADMIN","USER"])] ,TeamController.addTeam);
  router.get("/teams/:id" ,TeamController.getTeamById);
  router.put("/teams/:id",[checkJwt, checkRole(["ADMIN","USER"])] ,TeamController.updateTeam);
  router.delete("/teams/:id",[checkJwt, checkRole(["ADMIN","USER"])] ,TeamController.deleteTeam);
  //users
  router.get("/users",[checkJwt, checkRole(["ADMIN","USER"])] ,UserController.getAllUsers);
  router.post("/users",[checkJwt, checkRole(["ADMIN","USER"])] ,UserController.addUser);
  router.get("/users/:id",UserController.getUserById);
  router.put("/users/:id",[checkJwt, checkRole(["ADMIN","USER"])] ,UserController.updateUser);
  router.delete("/users/:id",[checkJwt, checkRole(["ADMIN","USER"])] ,UserController.deleteUser);
  //users
  router.get("/players",[checkJwt, checkRole(["ADMIN","USER"])] ,PlayerController.getAllPlayers);
  router.post("/players",[checkJwt, checkRole(["ADMIN","USER"])],PlayerController.addPlayer);


  export default router;
