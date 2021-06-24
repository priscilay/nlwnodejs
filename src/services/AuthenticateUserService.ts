import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import {sign} from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
  email: string,
  password: string
}

class AuthenticateUserService{

  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories)

    //verificar se email existing
    const user = await userRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error ("Email/password incorrect")
    }

    //verificar se senha esta corretament
    // 122345 / senha com hash comparar a senha com hash
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error ("Email/password incorrect")
    }

    //gerar token 
    const token = sign({
      email: user.email
    }, "32e8e054a4a4a99161ef2ce73aab065d", {
      subject: user.id,
      expiresIn: "1d"
    })

    return token
  
  }

}

export{AuthenticateUserService}