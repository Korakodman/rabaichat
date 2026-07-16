'use client'
import { Button,Card,Modal ,useOverlayState,Tabs,ErrorMessage} from "@heroui/react";
import { UserRound } from "lucide-react"
import { option } from "@/data/optionStory";
import { story } from "@/data/story";
import { useState } from "react";
import {  useForm, } from "react-hook-form";
import { Header } from "@heroui/react";
import { ca, tr } from "zod/v4/locales";
import { useRouter } from "next/navigation";
export default function Home() {
  const [button,setButton] = useState(false)
  const route = useRouter()
  const speaker = useForm({
    defaultValues:{
      role:"speaker"
    }
  })
  const listen = useForm({
    defaultValues:{
      role:"listener"
    }
  })
  
  function onSubmitHandle(data) {
    switch (data.role) {
      case "speaker":
         console.log("กำลังสร้างห้อง...",data)
         let dataJson = JSON.stringify(data)
         localStorage.setItem("user",dataJson)
         setButton(true)
         setTimeout(() => {
         route.push("/Chat-Room")
         }, 3000);
        break;
      case "listener":
        console.log("กำลังค้นหาห้องสำหรับผู้ฟัง... ",data)
          setButton(true)
         setTimeout(() => {
         route.push("/Chat-Room")
         }, 3000);
        break;
      default:
        console.log("มี Error กรุณาตรวจสอบ")
        break;
    }
  }

 // เข้าถึง state Form username และสุ่มชื่อ
function HandleButtonRamdomGuest(params) {
  speaker.setValue("username",GenerateGustName())
}
function GenerateGustName() {
 return `#${String(Math.floor(Math.random()*10000)).padStart(4,"0")}`
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
      <Tabs.ListContainer >
        <Tabs.List aria-label="Vertical tabs" className="mt-6 bg-[#44444E] h-25 flex justify-center *:data-[selected=true]:text-black *:data-[focus-visible=true]:bg-red-500">
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
     <div className="flex">
       <div className="grid">
        <input {...speaker.register("name",{required:"ใส่ชื่อด้วยครับ"})} placeholder="ตั้งชื่อ" 
      className="p-2 border-2 border-[#37353E] rounded-2xl focus:outline-0"
        aria-invalid={speaker.setError.name ? "true" : "false"} 
      />
        <ErrorMessage className="mt-2 ml-2">{speaker.formState.errors.name?.message}</ErrorMessage>
       </div>
      <div className="flex justify-center">
        <Button onClick={HandleButtonRamdomGuest}  className="box-border bg-[#D3DAD9] text-[#44444E] ml-2" type="button">สุ่มชื่อ</Button>
        </div>
     </div>
      <select {...speaker.register("roomId", { required:"กรุณาเลือกหัวข้อ"})} className="mt-2">
        {story.map((title)=>{
          return(
            <option className="text-[#37353E]" key={title.id} value={title.value}>{title.title}</option>
          )
        })}
      </select>
       <ErrorMessage className="mt-2 ml-2">{speaker.formState.errors.story?.message}</ErrorMessage>
    <div className="flex justify-center">
      <Button type="submit" className=" mt-2 box-border bg-[#D3DAD9] text-[#44444E] ml-2"  isDisabled={button} >{button ? "กำลังสร้างห้อง.." : "ยืนยัน"}</Button>
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
        <Button className="mt-2 box-border bg-[#D3DAD9] text-[#44444E]" type="submit" isDisabled={button}>{button ? "กำลังค้นหาห้อง.." : "ยืนยัน"}</Button>
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
