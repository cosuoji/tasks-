import Organizations from "../database/schema/organizationSchema.js";
import Tasks from "../database/schema/taskSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import moment from "moment"

export const displayTasks = async(orgid)=>{
    try {
    const orgName = await Organizations.findById(orgid)
    const usersInOrg = orgName.usersInOrganization
    const name = orgName.name
    return {
        name, usersInOrg, orgid
    }
    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const addNewTask = async(orgid, name, userAssigned, status, priority,  endDate, label, description,comments)=>{
    try{

        let tags = label.split(",")
        let labelArray = []
        for(let i = 0; i < tags.length; i++){      
            if(tags[i] === "") {
                continue
            } else{
             tags[i] = tags[i].trim()
             labelArray.push(tags[i])
            }
        }

        let users = userAssigned.split(",")

         const newTask = new Tasks({
           name, organization: orgid, userAssigned: users, priority, labels: labelArray, status,endDate, comments, description
        })
        await newTask.save()
        return{
            result: newTask
        }
    }catch(err){
      throw new ErrorWithStatus(err.message, 500)
    }
}