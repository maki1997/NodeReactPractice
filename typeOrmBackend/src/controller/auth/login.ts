import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../../entity/User";
import config from "../../config/config";

export async function login(req: Request, res: Response) {
  //Check if username and password are set
  let { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send();
  }

  //Get user from database
  const userRepository = getRepository(User);
  let user: User;
  try {
    user = await userRepository.findOneOrFail({ where: { username } });
    console.log(JSON.stringify(user));
  } catch (error) {
    res.status(401).send();
  }

  //Check if encrypted password match
  console.log("userpass: " + password);
  if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    res.status(401).send();
    return;
  }

  //Sign JWT, valid for 1 hour
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: "1h" }
  );

  //Send the jwt in the response
  res.send(token);
};
