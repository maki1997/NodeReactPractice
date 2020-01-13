import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import UserController from "../controller/UserController";
import AuthController from "../controller/AuthController";
import TeamController from "../controller/TeamController";

  const router = Router();


  // auth
  router.post("/login", AuthController.login);
  router.post("/change-password" ,[checkJwt, checkRole(["ADMIN","USER"])] , AuthController.changePassword);
  //teams
  router.get("/teams",[checkJwt, checkRole(["ADMIN","USER"])],TeamController.getAllTeams);
  router.post("/teams",TeamController.addTeam);
  router.get("/teams/:id",[checkJwt, checkRole(["ADMIN","USER"])],TeamController.getTeamById);
  router.put("/teams/:id",TeamController.updateTeam);
  router.delete("/teams/:id",[checkJwt, checkRole(["ADMIN","USER"])],TeamController.deleteTeam);
  //users
  router.get("/users",[checkJwt, checkRole(["ADMIN","USER"])],UserController.getAllUsers);
  router.post("/users",UserController.addUser);
  router.get("/users/:id",[checkJwt, checkRole(["ADMIN","USER"])],UserController.getUserById);
  router.put("/users/:id",UserController.updateUser);
  router.delete("/users/:id",[checkJwt, checkRole(["ADMIN","USER"])],UserController.deleteUser);


  export default router;
