import Organizations from "../database/schema/organizationSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";

export const displayTasks = async(orgid)=>{
    try {
    const orgName = await Organizations.findById(orgid)
    const name = orgName.name
    return {
        name
    }
    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const addNewTask = async()=>{
    try{
        return{
            message: "yeah"
        }
    }catch(err){
      throw new ErrorWithStatus(err.message, 500)
    }
}