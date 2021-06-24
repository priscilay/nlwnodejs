import {Request, Response} from "express"
import { Compliment } from "../entities/Compliment";
import { CreateComplimentService } from "../services/CreateComplimentService"

class CreateComplimentController{ 
  async handle(request: Request, response: Response) {
    const {tag_id, user_receiver, user_sender, message} = request.body

    const createComplimentService = new CreateComplimentService();

    await createComplimentService.execute({
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    return response.json(Compliment)
  }
}

export {CreateComplimentController}