import { Router } from "express";
import {generateMiddleware} from "../middleware/generatedMiddleware.js"
import { inviteSchema } from "../validations/authValidations.js";
const inviteRoute = Router()



inviteRoute.post('/register', generateMiddleware(inviteSchema), inviteController.invite)
