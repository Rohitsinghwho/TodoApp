import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"
const app = express()
// config cross origin resource sharing 
app.use(cors({
    path:process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:16})) // for parsing application/json
app.use(urlencoded({limit:16})) //for pasrsing url data
app.use(cookieParser()) //to send and recive cookies

//routes




export {app}