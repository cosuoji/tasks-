import { Router } from "express";
import {generateMiddleware} from "../middleware/generatedMiddleware.js"
import { userMiddleware } from "../middleware/userMiddleware.js";
import { inviteSchema } from "../validations/authValidations.js";
import * as inviteController from "../controllers/inviteController.js"
const inviteRoute = Router()



inviteRoute.post('/sendinvite', userMiddleware, generateMiddleware(inviteSchema), inviteController.sendInviteRequest)


export default inviteRoute