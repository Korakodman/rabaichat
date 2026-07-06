
const {Server} = require("socket.io")


// การแก้ปัญหา core เนื่องจาก frontend กับ backend แยกกัน
const io = new Server(3001,{    
    cors:{
        origin:["http://localhost:3000"]
    }, 
    credentials: true,
    methods:["GET","POST"]
})

console.log("เซิฟกำลังทำงาน")
io.on("connection",(socket)=>{
    console.log("a user connected",socket.id)

    socket.on("join", (username) => {
    socket.username = username;
    socket.emit("system",`${username} Joined`)
  });
    
   socket.on("send-message",(msg)=>{
    io.emit("receive-message",{
    name:socket.username || "Unknows client",
    textMessage:msg,
    role:"speaker",
    id:Date.now(),
    time: new Date().toLocaleString("th-TH")
    })
   
   })

     socket.on("disconnect", () => {
    console.log("disconnected:", socket.id);
  });
})


