'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@heroui/react'
import axios from 'axios'
import { socket } from '@/lib/socket'

function page() {


  const InputRef = useRef()
  const [user,setUser] = useState("jame")
  

   // handle ServerSocket

   useEffect(()=>{
    socket.emit("join",user)
   },[])


  const [message,setMessage] = useState([{
    textMessage:"ยินดีต้อนรับเข้าแชทระบาย",
    name:"ระบบ",
    role:"speaker",
    id:4
  },{
    textMessage:"chat-1",
    name:"korakod",
    role:"speaker",
    id:1
  },{
    textMessage:"chat-2",
    name:"jame",
     role:"listen",
    id:2
  },
  {textMessage:"chat-3",
    name:"bond",
    role:"listen",
    id:3
  }])


  // mock input message test
  function sendMessage(params) {
    let text = InputRef.current.value 
    if(!text){
      return
    }else{
    setMessage((prev)=>[...prev,{
    textMessage:text,
    name:"jame",
    role:"listen",
    id:Math.floor(Math.random()*10000),
    time: new Date().toLocaleString("th-TH")
   }])
   InputRef.current.value = ""
    }
     
    axios.post("http://localhost:4000/api/v1/message",{message})
    .then((respone)=>{
      console.log(respone)
    })
    .catch((error)=>{
      console.log(error)
    })
    .finally(()=>{
      console.log("request 100%")
    })
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
          {message.map((msg)=>
          {return(
            // layout Chat
            <div key={msg.id} className={`flex ${msg.name === user ? "justify-end" : " justify-start"}`}>
              {/* box-chat */}
              <div className={`p-2 rounded-xl max-w-[70%] break-words ${
            msg.name === user
              ? "bg-[#44444E] text-[#D3DAD9] rounded-tr-none"
              : "bg-[#44444E]/60 text-[#DFD0B8] rounded-tl-none"
          }`}>
               
              <div className='text-sm grid'>
                <div>{msg.name !== user && <span className='font-semibold'>{msg.name}: </span>} 
                 {msg.textMessage}
                 </div>
                </div>
             
              </div>
              </div>
          )})}
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