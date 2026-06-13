import app from "./src/app"
import { envConfig } from "./src/config/config"
import User from "./src/database/models/userModel";


function startServer(){
    const port = envConfig.port || 4000
    app.listen(port,()=>{
        console.log(`Server has started at port [${port}]`)
        
    })
}

startServer()