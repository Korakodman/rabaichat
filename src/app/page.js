'use client'
import { Button,Card,Modal ,useOverlayState,Tabs,ErrorMessage} from "@heroui/react";
import { UserRound } from "lucide-react"
import { option } from "@/data/optionStory";
import { story } from "@/data/story";
import { useState } from "react";
import {  useForm, } from "react-hook-form";
import { Header } from "@heroui/react";
export default function Home() {
  const state = useOverlayState()

  const speaker = useForm()
  const listen = useForm()
  
  const [handleButton,SethandleButton] = useState(false)
  function onSubmitHandle(data) {
    if(data.username){
      console.log("กำลังสร้างห้อง...")
    }else{
      console.log("กำลังค้นหาห้องสำหรับผู้ฟัง...")
    }
  }

  

 
  return (
    <div className="min-w-max h-screen text-[#D3DAD9]">
      <main className="flex items-center content-center flex-col h-screen place-content-center">
        {/* <----- header -----> */}
        <section className="max-w-max">
          <div><h1 className="text-3xl">มีเรื่องอยากระบายไหม?</h1></div>
        </section>
        {/* <----- Option client -----> */}
        <section className="grid ">
          <div className="">
            <h1 className="text-2xl">สร้างห้องและพูดคุยกับผู้ฟัง 2 คน ที่พร้อมรับฟังโดยไม่ตัดสินคุณ</h1>
          </div>
          <div className="grid justify-evenly mt-10 ">
          
           {/* <-------Form for speaker -------*/}
               <Tabs className="w-full " orientation="vertical">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Vertical tabs" className="mt-6 bg-[#44444E]  *:data-[selected=true]:text-black *:data-[focus-visible=true]:bg-red-500">
          {option.map((text,index)=>{
            return(
              <Tabs.Tab id={text.title} key={text.id} className="p-4 flex justify-center  w-30  text-[#D3DAD9]">
            {text.title}
            <Tabs.Indicator />
             </Tabs.Tab>
            )
          })}
         
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="px-4 border-2 border-[#37353E] bg-[#44444E] rounded-2xl w-[350px]" id="สร้างห้องพูดคุยกับผู้ฟัง">
         <form onSubmit={speaker.handleSubmit((data)=>onSubmitHandle(data))} className="grid">
      <Header />
      <input {...speaker.register("username",{required:"ใส่ชื่อด้วยครับ"})} placeholder="ใส่ชื่ออะไรก็ได้" 
      className="p-2 border-2 border-[#37353E] rounded-2xl focus:outline-0"
        aria-invalid={speaker.setError.username ? "true" : "false"} 
      />
        <ErrorMessage className="mt-2 ml-2">{speaker.formState.errors.username?.message}</ErrorMessage>
      <select {...speaker.register("story", { required:"กรุณาเลือกหัวข้อ"})} className="mt-2">
        {story.map((title)=>{
          return(
            <option className="text-[#37353E]" key={title.id} value={title.value}>{title.title}</option>
          )
        })}
      </select>
       <ErrorMessage className="mt-2 ml-2">{speaker.formState.errors.story?.message}</ErrorMessage>
    <div className="flex justify-center">
      <Button type="submit" className=" mt-2 box-border bg-[#D3DAD9] text-[#44444E]" >ยืนยัน</Button>
    </div>
    
    </form>
    {/* <-------Form for listening -------*/}
      </Tabs.Panel>
      <Tabs.Panel className="px-4 border-2 border-[#37353E] bg-[#44444E] rounded-2xl w-[350px]" id="รับบทเป็นผู้ฟัง">
     <form onSubmit={listen.handleSubmit((data)=>onSubmitHandle(data))}>
      <div className="grid">
      <div className="flex justify-center">
        คุณอยากรับฟังเรื่องอะไร?
      </div>
      <select {...listen.register("story", { required: true })} >
       {story.map((title)=>{
        return(
          <option className="text-[#37353E]" key={title.id} value={title.value}>{title.title}</option>
        )
       })}
      </select>
       <div className="flex justify-center">
        <Button className="mt-2 box-border bg-[#D3DAD9] text-[#44444E]" type="submit">ยืนยัน</Button>
       </div>
     </div>
     </form>
      </Tabs.Panel>
    </Tabs>
             </div>

         
            
          {/*<----- SelectionUser ------>*/}
          
        </section>
      </main>
    </div>
  );
}
