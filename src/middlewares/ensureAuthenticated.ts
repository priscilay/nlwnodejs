import { Request, Response, NextFunction, request } from 'express';
import { verify } from "jsonwebtoken"

interface IPayload{
  sub: string;
}

export function ensureAuthenticated(
request: Request, response: Response, next: NextFunction
) {
// receber token
  const authToken = request.headers.authorization;
  
  const [,token] = authToken.split(" ");
//validar se token esta valido
  try {
    const { sub } = verify(token, "32e8e054a4a4a99161ef2ce73aab065d") as IPayload;
    request.user_id = sub;
    
    return next()

  } catch (error) {
    return response.status(401).end();
  }
//recuperar informacoes do usuario 

}

