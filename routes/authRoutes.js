
import { Router } from "express";
import {generateMiddleware} from "../middleware/generatedMiddleware.js"
import * as authController from "../controllers/authController.js"
import { loginSchema, passwordSchema, registerSchema, resetSchema } from "../validations/authValidations.js";
import { userMiddleware } from "../middleware/userMiddleware.js";


const authRoute = Router()


authRoute.get('/', userMiddleware,  async(req, res)=> {
   res.render('dashboard', {
    title: 'Taskly',
  });
});




authRoute.get('/register', async(req, res)=> {
   res.render('register')
});

authRoute.get('/login', async(req, res)=> {
   res.render('login')
});

authRoute.get('/forgot', async(req, res)=> {
   res.render('forgot')
});

authRoute.get("/forgot/:userId/:token", async(req, res)=>{
  res.render("reset")
})


authRoute.get("/logout", authController.logout)


authRoute.post('/register', generateMiddleware(registerSchema), authController.register)
authRoute.post('/login', generateMiddleware(loginSchema), authController.login)
authRoute.post("/forgot", generateMiddleware(resetSchema), authController.forgotPassword)
authRoute.post("/forgot/:userId/:token", generateMiddleware(passwordSchema), authController.resetPassword)

export default authRoute