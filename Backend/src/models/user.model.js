const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, "Name is required"],
    },
    username: {
        type:String,
        unique:[true, "User name already exists"],
        required:[true, "User name is required"],
    },
    email:{
        type:String,
        unique:[true, "Email already exists"],
        required:[true, "Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false
    },
    bio:String,
    profileImage: {
    id: { type: String, default: "" },
    url: { type: String, default: "https://ik.imagekit.io/1jmdeogfb/Social%20Media%20/default_profile_pic.jpg" }
    },
    gender: {
        type:String,
        required: true,
        enum : ["Male","Female","Not prefer to say"]
    },
},{ timestamps: true })

const userModel = mongoose.model("users",userSchema)
module.exports = userModel;