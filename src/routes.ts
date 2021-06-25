import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentController } from "./controllers/ListUserReceiveComplimentController";
import { ListUserReceiveComplimentController } from "./controllers/ListUserSendComplimentController";


const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentController = new ListUserSendComplimentController()
const listUserReceiveComplimentController = new ListUserReceiveComplimentController()

router.post("/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle);
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle)
router.post("/compliments",
  ensureAuthenticated,
  createComplimentController.handle)

router.get("/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentController.handle);
router.get("/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentController.handle);

export { router }


/**
server -> routes -> controller -> service (throw new error)
**/