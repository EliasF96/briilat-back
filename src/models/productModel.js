import { Schema, model } from "mongoose";
const productSchema = Schema({
    name:{
        type : String,
        require : [true , "Name required"],
    },
    price:{
        type : Number,
        require : [true , "Price required"],
    },
    stock : Number,
    category : String,
    description : String,
    img : String
})

const productModel = model("product", productSchema)
export default productModel