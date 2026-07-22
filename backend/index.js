
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



  const rooms = {}

io.on("connection",(socket)=>{
 console.log("connected", socket.id);
   // เมื่อผู้ใช้เข้าห้องมา
    socket.on("join-room",(room)=>{
  
    // ถ้าไม่มีห้องสร้างห้องใหม่
     if(!rooms[room.roomId]){
     rooms[room.roomId] = []
     }
     // ถ้ามีห้องแล้วให้เพิ่มผู้ใช้เข้าไปห้องนั้นๆ
      rooms[room.roomId].push({
        sockId:socket.id,
        name:room.name
      })  
       socket.join(room.roomId)
     
    io.to(room.roomId).emit("online-user",rooms[room.roomId])
     }

  );

    // ส่งข้อความ
   socket.on("send-message",(data)=>{
   // ส่งข้อความไปยังห้องนั้นที่อยู่
    io.to(data.roomId).emit("receive-message",{
    name:socket.username || "Unknows client",
    textMessage:data.text,
    role:"speaker",
    id:Date.now(),
    time: new Date().toLocaleString("th-TH"),
    socket: socket.id
    })
   
   
   })

   socket.on("leave-room", (roomId) => {
  socket.leave(roomId);

  rooms[roomId] = rooms[roomId].filter(
    user => user.sockId !== socket.id
  );

  io.to(roomId).emit("online-user", rooms[roomId]);
});

   // เมื่อมีการ disconnecting หรือกดออกจากเว็บให้ลบ sockId ใน rooms backend
socket.on("disconnecting", () => {
  // ลูปข้อมูล key rooms แต่ละห้องเพื่อหา id
   for(const room of socket.rooms){
    if(room === socket.id) continue
    console.log("ข้อมูลห้อง",room)
    rooms[room] = rooms[room].filter(user => user.sockId !== socket.id)
    io.to(rooms[room]).emit("online-user",rooms[room])
    // ถ้าห้องนั้นไม่มีคนอยู่ให้ลบห้องนั้นออก
     if(rooms[room].length === 0)
      delete rooms[room]

     
   }
  
  });
   
     socket.on("disconnect", () => {
    

    console.log("disconnected:", socket.id);
  
  });
})


