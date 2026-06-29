'use client'
import React, { useRef, useState } from 'react'
import { Input } from '@heroui/react'
function page() {


  const InputRef = useRef()
  const [user,setUser] = useState("jame")
  
  const [message,setMessage] = useState([{
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
   if(InputRef.current.value !== ""){
   setMessage((prev)=>[...prev,{
    textMessage:InputRef.current.value,
    name:"korakod",
    role:"listen",
    id:Math.floor(Math.random()*10000)
   }])
   }else{
    return
   }
  }

  function handleKeyPress(e) {
    if(e.key === "Enter"){
      sendMessage()
    }
  }


  return (
    <main className='p-2 h-screen  '>
      {/* header */}
     <header>Chat-Room</header>
     {/* bg-chat-history */}
      <section className=' '>
       <div className='flex flex-col h-[750px]'>
         <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {message.map((msg)=>
          {return(
            <div key={msg.id} className={`flex ${msg.name === user ? "justify-end" : " justify-start"}`}>
              {msg.textMessage}
              <span>{msg.name}</span>
              </div>
          )})}
         </div>
       </div>
      </section>
      {/* Input-chat */}
      <section className='h-auto w-96 md:w-auto flex ml-4 md:ml-0'>
         <input placeholder="ข้อความ" ref={InputRef} onKeyDown={handleKeyPress}
      className="flex-1 rounded-l-md p-2 text-[#D3DAD9] bg-[#44444E] outline-none text-2xl placeholder-[#37353E]"/>
       <button
          className="bg-[#44444E]/70 hover:bg-[#D3DAD9]/20 text-[#D3DAD9] w-[200px] px-4 rounded-r-md" onClick={sendMessage}
        >
          Send
        </button>
      </section>
    </main>
  )
}

export default page