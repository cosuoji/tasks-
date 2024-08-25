import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
    },
    owner:{
     type:String,
    },
    usersInOrganization:{
	type: Array,
	default: [],
    }, 
    tasks:{
        type: Array,
        default:[],
    }
}, {
    timestamps: true
})

organizationSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const Organizations = mongoose.model("organizations", organizationSchema)
export default Organizations