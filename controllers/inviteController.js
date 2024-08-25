import * as inviteService from "../services/inviteService.js"

export const sendInviteRequest = async(req, res)  =>{
try {
    const {email, organization} = req.body;
    const result = await inviteService.sendInviteRequest(email, organization);
    res.json(result)
    
} catch (err) {
    res.status(err.status || 500);
    res.json({message: err.message})
}

}