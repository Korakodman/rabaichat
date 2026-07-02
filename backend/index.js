const express = require("express")
const app = express()
const core = require("cors")


app.use(core())
app.use(express.json())

app.get("/hello",(req,res)=>{
    res.send("Hello NodeJS")
})
app.post("/api/v1/message",(req,res)=>{
    console.log(req.body)
})
app.get("/api/v1/message",(req,res)=>{
    res.send("message")
})
app.listen("4000",()=>{
    console.log("port running at 4000")
})