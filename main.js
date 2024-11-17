import server from "./src/server/server.js"
import { config } from "dotenv";
import connect from "../node2/src/database/configuration.js";

config()
connect()
const PORT = import.meta.PORT || 8001
server.listen(PORT, ()=> console.log("Server initated in port: " + PORT))