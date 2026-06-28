import React from 'react'

function page() {


  const message = [{
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
  }]

  return (
    <main className='p-2 h-screen  '>
      {/* header */}
     <header>Chat-Room</header>
     {/* bg-chat-history */}
      <section className=' relative flex-col  h-11/12 border-2 border-black'>
       <div className='grid'>
         <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {message.map((msg)=>
          {return(
            <div key={msg.id} className={`flex ${msg.id === 2 ? "justify-end" : " justify-start"}`}>
              {msg.textMessage}
              <span>{msg.name}</span>
              </div>
          )})}
         </div>
       </div>
      </section>
      <section></section>
    </main>
  )
}

export default page