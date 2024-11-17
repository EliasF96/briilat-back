import { Schema, model } from "mongoose";
const cartSchema = Schema({
    name:{
        type : String,
        require : [true , "Name required"],
    },
    price:{
        type : Number,
        require : [true , "Price required"],
    },
    amount: Number,
    category : String,
    productId: String,
    img : String,
    username : {
        type:String,
        require : [true, "Usuario necesario para añadir producto"]
    }
})

const cartModel = model("cart", cartSchema)
export default cartModel