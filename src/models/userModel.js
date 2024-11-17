import { Schema, model } from "mongoose";
const UserSchema = Schema({
    username:{
        unique : true,
        type:String,
        required: [true,  "Username is required!"]
    },
    password: {
        type:String,
        required: [true,  "Password is required!"]

    },
    rol:{
        type:String
    }
})

const userModel = model("user", UserSchema)

export default userModel