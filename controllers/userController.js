import * as userService from "../services/userService.js"

export const sendInviteRequest = async(req, res)  =>{
try {
    const {email, organization} = req.body;
    const result = await userService.sendInviteRequest(email, organization);
    res.redirect(`/`)
    
} catch (err) {
    res.status(err.status || 500);
    res.json({message: err.message})
}

}

export const userOrganizations = async(req, res) =>{
    try{
        const result = await userService.userOrganizations()
        res.render("profile", {userOrgData: JSON.stringify(result.arr)})

    } catch(err){
        res.status(err.status || 500);
        res.json({message: err.message})
    }
}