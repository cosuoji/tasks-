import * as userService from "../services/userService.js"

export const sendInviteRequest = async(req, res)  =>{
try {
    const {email, organization} = req.body;
    //console.log(organization)
    const result = await userService.sendInviteRequest(email, organization);
    res.redirect("/dashboard")
    
} catch (err) {
    res.status(err.status || 500);
    res.json({message: err.message})
}

}