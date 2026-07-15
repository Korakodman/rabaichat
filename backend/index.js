
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
  const rooms = {}

    console.log("a user connected",socket.id)
    socket.on("join", (username) => {

    socket.username = username;
    socket.emit("system",`${username} Joined`)

    // เมื่อผูใช้เข้าห้องมา
    socket.on("join-room",(room)=>{
  
    // ถ้าไม่มีห้องสร้างห้องใหม่
     if(!rooms[room.roomId]){
     rooms[room.roomId] = []
     }
     // ถ้ามีห้องแล้วให้เพิ่มผู้ใช้เข้าไปห้องนั้นๆ
      rooms[room.roomId].push({
        sockId:socket.id,
        username:room.username
      })
      console.log(rooms)
     }
    )
   

  });
    
   socket.on("send-message",(msg)=>{
    io.emit("receive-message",{
    name:socket.username || "Unknows client",
    textMessage:msg,
    role:"speaker",
    id:Date.now(),
    time: new Date().toLocaleString("th-TH"),
    socket: socket.id
    })
   
   })


   
     socket.on("disconnect", () => {


    console.log("disconnected:", socket.id);
  });
})


