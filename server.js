import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import authRoute from "./routes/authRoutes.js"
import bodyParser from "body-parser"
import { rateLimiterUsingThirdParty } from "./utils/rateLimiter.js"
import client from "./utils/redis.js"
import { connect } from "./database/schema/connection.js"
import userRoutes from "./routes/userRoutes.js"

//import httpLogger from "./logger/httplogger.js"




dotenv.config()
const app = express()
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT ||  5000
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))
app.use(rateLimiterUsingThirdParty)
app.use(bodyParser.urlencoded({extended: false}))
//app.use(httpLogger)

client.connect()

app.set('view engine', 'ejs');

app.use("/", authRoute)
app.use("/dashboard", userRoutes)



//catch other routes
app.all("*", (req, res )=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})


//connect to DB
connect(MONGODB_URI)
.then(()=>{
        console.log("Connected to DB")
        app.listen(PORT, _ =>{
            console.log("Taskly is running on PORT", PORT)
        })
    })



export default app     