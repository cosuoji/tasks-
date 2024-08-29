import { Router } from "express";
import { userMiddleware } from "../middleware/userMiddleware.js";
import * as orgController from "../controllers/orgController.js"
const orgRoute = Router()


orgRoute.get("/:orgid", userMiddleware, orgController.displayTasks)
orgRoute.post("/:orgid", userMiddleware, orgController.addNewTask)

export default orgRoute