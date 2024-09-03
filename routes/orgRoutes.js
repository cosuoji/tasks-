import { Router } from "express";
import { userMiddleware} from "../middleware/userMiddleware.js";
import * as orgController from "../controllers/orgController.js"
import { taskSchema } from "../validations/authValidations.js";
import { generateMiddleware } from "../middleware/generatedMiddleware.js";
const orgRoute = Router()


orgRoute.get("/:orgid", userMiddleware, orgController.displayTasks)
orgRoute.post("/:orgid", userMiddleware, generateMiddleware(taskSchema), orgController.addNewTask)

export default orgRoute