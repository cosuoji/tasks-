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
       }

       organizationInfo.usersInOrganization.push(email)
       await organizationInfo.save()
        if(!user){
           await sendEmail(email, `${sender.name} added you to ${organization}` , `Please sign up with us at "email" to access the taskboard`);
             } else {
         await sendEmail(email, `${sender.name} added you to ${organization}` , `Please login "here" to access the taskboard`);
         }
    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}