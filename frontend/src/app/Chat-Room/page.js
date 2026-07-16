'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@heroui/react'
import axios from 'axios'
import { socket } from '@/lib/socket'
import { useRouter } from 'next/navigation'
function page() {


//  {
//     textMessage:"chat-1",
//     name:"korakod",
//     role:"speaker",
//     id:1
//   }
// {
//     textMessage:"chat-2",
//     name:"jame",
//      role:"listen",
//     id:2
//   }
  const InputRef = useRef()
  const route = useRouter()
  const [user,setUser] = useState()
  const [room,setRoom] = useState(
    {roomA:[{

    }]}
  )
  

   // handle ServerSocket

   useEffect(()=>{

    const handleMessage = (data)=>{
      //ปัญารับเป็น array
      //  setMessage(data)
  setMessage((prev)=>[...prev,data])
  } 
  const handleRoom = (data)=>{
    setRoom((prev)=>[...prev,data])
  }
  // ดึงข้อมูลจาก local key user ระบบชั่วคร่าว
  const username = localStorage.getItem("user")
  // แปลงเป็น object
  const userobject = JSON.parse(username)
      if(!userobject){
       alert("ไม่พบชื่อผู้ใช้")
       route.push("/")
       return
      }

      
setUser(userobject.name)
      socket.emit("join",userobject.name)
      socket.emit("join-room", {
  roomId: userobject.roomId,
  userId: Date.now(),
  username: userobject.name,
},)
      socket.on("receive-message",handleMessage)
     

  //     socket.on("system", (msg) => {
  //       // เจอปัญหาส่งไปยัง backend เป็น array แก้ไขแล้ว
  //       setMessage(prev=>[
  //       ...prev,{
  //   textMessage:msg,
  //   id:Date.now(),
  //   time: new Date().toLocaleString("th-TH")
  // }])
  //  }); 
      
     
    return ()=>{
      socket.off("receive-message",handleMessage)
      socket.off("system")
      
    }
    
   },[])
  
  


  const [message,setMessage] = useState([{
      id: 1,
      name: "ระบบ",
      textMessage: "Welcome to chat 👋",
      role:"speaker"
    },])


  // mock input message test
  function sendMessage(params) {
    let text = InputRef.current.value 
    if(!text){
      return
    }
   InputRef.current.value = ""
    // ดึงข้อมูลจาก local key user ระบบชั่วคร่าว
  const username = localStorage.getItem("user")
  // แปลงเป็น object
  const userobject = JSON.parse(username)
   socket.emit("send-message",{userobject,text})
  }

  function handleKeyPress(e) {
    if(e.key === "Enter"){
      sendMessage()
    }
  }



  return (
    <main className='h-screen flex flex-col '>
     {/* bg-chat-history */}
      <section className='flex flex-col h-[775px]'>
         <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {message.map((msg,index)=>
   
            // layout Chat
            <div key={index} className={`flex ${msg.name === user ? "justify-end" : " justify-start"}`}>
              {/* box-chat */}
              <div className={`p-2 rounded-xl max-w-[70%] break-words ${
            msg.name === user
              ? "bg-[#44444E] text-[#D3DAD9] rounded-tr-none"
              : "bg-[#44444E]/60 text-[#DFD0B8] rounded-tl-none"
          }`}>
               
              <div className='text-sm grid'>
                <div>{msg.name !== user  && <span className='font-semibold'>{msg.name}: </span>} 
                 {msg.textMessage}
                 </div>
                </div>
             
              </div>
              </div>
          )}
         </div>
      </section>
      {/* Input-chat */}
      <section className='h-auto w-auto flex ml-4 md:ml-2'>
         <input placeholder="ข้อความ" ref={InputRef} onKeyDown={handleKeyPress}
      className="flex-1 rounded-l-md p-2 text-[#D3DAD9] bg-[#44444E] outline-none text-2xl placeholder-[#37353E]"/>
       <button
          className="bg-[#44444E]/70 hover:bg-[#D3DAD9]/20 text-[#D3DAD9] shrink-0 px-4 rounded-r-md" onClick={sendMessage}
        >
          Send
        </button>
      </section>
    </main>
  )
}

export default page