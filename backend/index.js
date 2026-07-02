const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello NodeJS")
})
app.listen("4000",()=>{
    console.log("port running at 4000")
})