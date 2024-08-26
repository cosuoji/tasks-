import { Router } from "express";
import {generateMiddleware} from "../middleware/generatedMiddleware.js"
import { userMiddleware } from "../middleware/userMiddleware.js";
import { inviteSchema } from "../validations/authValidations.js";
import * as userController from "../controllers/userController.js"
import { userId } from "../middleware/userMiddleware.js";
import Organizations from "../database/schema/organizationSchema.js";
const userRoute = Router()


userRoute.get('/', userMiddleware, async(req, res)=>{
    const result = await Organizations.find({owner: userId})
    const name = result[0].name
    res.render("dashboard", {organization: name})
})

userRoute.post('/sendinvite', userMiddleware, generateMiddleware(inviteSchema), userController.sendInviteRequest)




export default userRoute 