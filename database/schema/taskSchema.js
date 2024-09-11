import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name: {
        type: String,
    },
    organization:{
         type:String,
    },
    userAssigned: {
        type: Array,
        default:[],
    },
    priority:{
        type: String,
        //options: Low, Medium, High
        default: "Medium",
    },
    labels:{
        type: Array,
        default: [],  
    },
    status:{
        type: String,
        //Status: Completed, Pending
        default: "Pending"     
    },
    endDate:{
        type: Date,
        required: true, 
    },
    comments: {
        type: String,
    },
    description: {
        type: String,
    },
    attachments: {
        type: Array,
        default: [],
    }
}, {
    timestamps: true
})

taskSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const Tasks = mongoose.model("tasks", taskSchema)
export default Tasks