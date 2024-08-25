import {sendEmail} from "../utils/sendEmail.js"
import User from "../database/schema/userSchema.js";
import ErrorWithStatus from "../exceptions/errorStatus.js";
import { userId } from "../middleware/userMiddleware.js";
import Organizations from "../database/schema/organizationSchema.js";


export const sendInviteRequest = async(email, organization) =>{
    try {
       const user = await User.findOne({email: email});
       const organizationInfo = await Organizations.findOne({name: organization})
       const sender = await User.findById(userId)


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