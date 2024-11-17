import express from "express"
import cors from "cors"
import productRoutes from "../routes/productRoutes.js"
import cookieParser from  "cookie-parser"
// cors permite hacer solicitudes de otros origenes1
const server = express()
var whitelist = ['http://localhost:8000' ]
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      
      callback(null, true)
    } else {
      
      callback(new Error('Not allowed by CORS'))
    }
  }
}
server.use(cors(corsOptions))
server.use(express.json())
server.use(cookieParser())
server.use("/api", productRoutes)
//CART
export default server