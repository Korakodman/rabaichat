
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
    io.emit("system", `${username} joined`);
  });

     socket.on("disconnect", () => {
    console.log("disconnected:", socket.id);
  });
})


