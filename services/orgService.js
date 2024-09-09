import Organizations from "../database/schema/organizationSchema.js";
import Tasks from "../database/schema/taskSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";





export const displayTasks = async(orgid)=>{
    try {
    const orgName = await Organizations.findById(orgid)
    const usersInOrg = orgName.usersInOrganization
    const name = orgName.name

    const initial = await Tasks.find({organization: orgid})
    
    //id, name, usersAssigned, priority, labels, status, endDate, comments, description, attachments
    let tasksToSend = []
  
    for(let i = 0; i < initial.length; i++){
       const {_id, name, userAssigned, priority, labels, status, endDate, comments, description, attachments} = initial[i]
       let obj = {}
       let usersToSend = []
       obj.id = _id.toHexString()
       obj.name = name

       //remove duplicates
       function remove(userAssigned){
        return [... new Set(userAssigned)]
       }


       obj.userAssigned = remove(userAssigned)
       obj.priority = priority
       obj.labels = labels
       obj.status = status
       obj.endDate = endDate
       obj.comments = comments
       obj.description = description
       obj.attachments = attachments


       tasksToSend.push(obj)
    }


    return {
        name, usersInOrg, orgid, tasksToSend
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
           name, organization: orgid, userAssigned: users, priority, labels: labelArray, status,endDate: endDate, comments, description
        })
        await newTask.save()
        return{
            result: newTask
        }
    }catch(err){
      throw new ErrorWithStatus(err.message, 500)
    }
}