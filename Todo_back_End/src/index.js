import {app} from './app.js'
import { connectDb } from './db/db.database.js'
import dotenv from 'dotenv'

dotenv.config({
    path:'./.env'
})
connectDb().then(()=>{
    app.on('error',(err)=>{
        console.log(`Server Not connected `,err)
        throw err;
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on port ${process.env.PORT || 8000}`)
    })
    }).catch((err)=>{
        console.error(`Connection Failed with the Server: `,err)
})