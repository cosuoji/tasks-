import * as authService from "../services/authService.js"
export let tokenToUse



export const login = async (req, res, next)=>{
    try {
        const { email, password} = req.body;
        const token = await authService.login(email, password)
        tokenToUse = token.data.accessToken
       

        //console.log(req.path, token)
        res.render("dashboard")
    }
    catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}


export const register = async (req, res)=>{
    try {
    const {name,password,email} = req.body
    const path = req.url
    await authService.register(name,email,password, path)
    res.render("dashboard")
    }
    catch(err){
        res.status(err.status || 500);
        res.json({messsage: err.message}) 
    }
}


export const logout = async(req, res) =>{
    try{
        await authService.logout(tokenToUse);
        res.redirect("/")
    } catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}

export const forgotPassword = async(req, res) =>{
    try{
        const {email} = req.body
        let result = await authService.forgotPassword(email);
        res.json({result})
    }
    catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}

export const resetPassword = async(req, res) =>{
    try{
        const {userId, token}  = req.body
        const newToken = token
        const {password} = req.body
        const newPassword = password
        const result = await authService.resetPassword(userId, newPassword, newToken)
        res.json({result})
    } catch(err){
        res.status(err.status || 500);
        res.json({message: err.message}) 
    }
}