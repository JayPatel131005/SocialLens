const express = require ('express')
const app = express()
const userRouter = require('./Routes/UserRoutes')
const problemRouter = require('./Routes/ProblemRoutes')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors());

mongoose.connect("mongodb://localhost:27017/socialUser");

app.use(express.json());
app.use("/api/auth", userRouter); 
app.use("/api/problems",problemRouter); 

app.listen(8000,()=>{
    console.log("your server is running on port 8000");
})