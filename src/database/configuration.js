import mongoose from "mongoose"
import { config } from "dotenv"
config()
const DATABASE = import.meta.DATABASE || ""
const connect = async()=>{
    try {
        await mongoose.connect(DATABASE)
        console.log("Connected to the Database!")
    } catch (error) {
        console.log(error)
    }
}
export default connect