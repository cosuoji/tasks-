import * as orgService from "../services/orgService.js"

export const displayTasks = async(req, res) => {
try {
    const {orgid} = req.params;
    console.log(orgid)
    const result = await orgService.displayTasks(orgid);
    res.render("organization", {organization: result.name})
    
} catch (err) {
    res.status(err.status || 500);
    res.json({message: err.message})
}
}

export const addNewTask = async(req, res)=>{
    try {
        const {orgid} = req.params;
        console.log(orgid)
        const result = await orgService.addNewTask()
        res.json(result)
        
    } catch (err) {
     res.status(err.status || 500);
     res.json({message: err.message}) 
    }
}

    