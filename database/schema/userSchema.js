import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type: String, 
        required: true,
    }, 
    organizations:{
        type:Array,
        default: [],
    },
}, {
    timestamps: true
})

userSchema.set("toJSON", {
    virtuals: true, 
    versionKey: false, 
    transform: function(doc, ret){
        delete ret._id
    }
})

const User = mongoose.model("user", userSchema)
export default User