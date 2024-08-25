import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    name: {
        type: String,
    },
    organizations:{
         type:String,
    },
    userAssigned: {
        type: Array,
        default:[],
    },
    tasks:{
        type: Array,
        default:[],
    }, 
    prorities:{
        type: String,
        default: "Medium",
    },
    labels:{
        type: Array,
        default: [],  
    },
    status:{
        type: String,
        default: "Pending"     
    },
    startDate:{
        type: Date,
        required: true, 
        min: new Date().toISOString().slice(0, new Date().toISOString().lastIndexOf(":"))
    },
    endDate: {
        type: Date, 
        required: true, 
    },
    comments: {
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