import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import UserController from "../controller/UserController";
import AuthController from "../controller/AuthController";
import TeamController from "../controller/TeamController";

  const router = Router();


  // auth
  router.post("/login", AuthController.login);
  router.post("/change-password", AuthController.changePassword);
  //teams
  router.get("/teams",TeamController.getAllTeams);
  router.post("/teams",[checkJwt, checkRole(["ADMIN"])],TeamController.addTeam);
  router.get("/teams/:id",TeamController.getTeamById);
  router.put("/teams/:id",TeamController.updateTeam);
  router.delete("/teams/:id",TeamController.deleteTeam);
  //users
  router.get("/users",UserController.getAllUsers);
  router.post("/users",UserController.addUser);
  router.get("/users/:id",UserController.getUserById);
  router.put("/users/:id",UserController.updateUser);
  router.delete("/users/:id",UserController.deleteUser);


  export default router;
