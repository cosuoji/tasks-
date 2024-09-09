import {sendEmail} from "../utils/sendEmail.js"
import User from "../database/schema/userSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/userMiddleware.js";
import Organizations from "../database/schema/organizationSchema.js";


export const sendInviteRequest = async(email, organization) =>{
    try {

      //if owner don't send, if sent before don't send 
       //console.log(email)
       const user = await User.find({email: email});
       const organizationInfo = await Organizations.findOne({name: organization})
       const sender = await User.findById(userId)

      // console.log(organizationInfo.usersInOrganization)

       if(organizationInfo.usersInOrganization.includes(email)){
          throw new ErrorWithStatus("User exists in Organization")
       } else {
          organizationInfo.usersInOrganization.push(email)
          await organizationInfo.save()
       }



        if(!user){
           await sendEmail(email, `${sender.name} added you to ${organization}` , `Please sign up with us at "email" to access the taskboard`);
             } else {
         await sendEmail(email, `${sender.name} added you to ${organization}` , `Please login "here" to access the taskboard`);
         }

         const orgid = organizationInfo._id
         return {
          result: orgid
         }
    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}

export const userOrganizations = async() =>{
  try {
    const user = await User.findById(userId)
    let arr = [];

    for(let i = 0; i  < user.organizations.length; i++){
       let link = await Organizations.find({name: user.organizations[i]})
       let key = link[0].name
       let answer = {[key]: link[0]._id.toString()}
       arr.push(answer)
    }

    return {
      arr
    }
  } catch (error) {
     throw new ErrorWithStatus(error.message, 500)
  }
}