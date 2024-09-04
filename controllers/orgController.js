import * as orgService from "../services/orgService.js"

export const displayTasks = async(req, res) => {
try {
    const {orgid} = req.params;
    const result = await orgService.displayTasks(orgid);
    res.render("organization", {organization: result.name, users: result.usersInOrg, orgid: orgid})
    
} catch (err) {
    res.status(err.status || 500);
    res.json({message: err.message})
}
}

export const addNewTask = async(req, res)=>{
    try {
        const {orgid} = req.params;
        const {name, status, priority, userAssigned, endDate, label, description, comments} = req.body
        const result = await orgService.addNewTask(orgid, name, userAssigned, status, priority,  endDate, label, description,comments)
        res.redirect(`/org/${orgid}`)      
    } catch (err) {
     res.status(err.status || 500);
     res.json({message: err.message}) 
    }
}

    