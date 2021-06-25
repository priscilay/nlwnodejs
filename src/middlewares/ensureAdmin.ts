import {Request, Response, NextFunction} from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import {User} from "../entities/User"

export async function ensureAdmin (request: Request, response: Response, next: NextFunction) {
  //verificar se é admin
  const { user_id } = request;
  
  const usersRepositories = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepositories.findOne(user_id)
  
  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unauthorized"
  })

}