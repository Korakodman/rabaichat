
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
   // เมื่อผู้ใช้เข้าห้องมา
    socket.on("join-room",(room)=>{

   const {roomId,userId,name,role} = room

    // ถ้าไม่มีห้องสร้างห้องใหม่
     if(!rooms[roomId]){
     rooms[roomId] = []
     }

   const users = rooms[roomId]



     // สร้างตัวแปรเช็คผู้ใช้ซ้ำภายในห้อง
    const userExist = rooms[roomId].some(
      user => user.name === socket.name
    )

    if(userExist){
      console.log("มีผู้ใช้ซ้ำแล้วภายในห้อง")
      return
    }
   // นับจำนวนผู้พูด(ระบาย)
   const speakerCount = users.filter(
    user => user.role === "speaker"
   ).length
    // นับจำนวนผู้ฟัง
  const listenCount = users.filter(
    user => user.role === "listener"
  ).length
   
  // เช็คจำนวนผู้พูด(ระบาย)ภายในห้องนั้น
  if(role === "speaker" && speakerCount >= 1){
    console.log("มีผู้ระบายภายในห้องนี้แล้ว")
    return
  }
  // เช็คจำนวนผู้ฟังภายในห้องนั้น
  if(role === "listener" && listenCount >= 1){
    console.log("มีผู้รับฟังครบ 2 คนภายในห้องแล้ว")
    return
  }

     // ถ้ามีห้องแล้วให้เพิ่มผู้ใช้เข้าไปห้องนั้นๆ
      users.push({
        sockId:socket.id,
        name,
        userId,
        role
      })  
       socket.join(roomId)
     
    io.to(roomId).emit("online-user",users)
    console.log(users)
     }

  );

    // ส่งข้อความ
   socket.on("send-message",(data)=>{
   // ส่งข้อความไปยังห้องนั้นที่อยู่
    io.to(data.roomId).emit("receive-message",{
    name:data.name || "Unknows client",
    textMessage:data.text,
    role:data.role,
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


