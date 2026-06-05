'use client'
import { Button,Modal ,useOverlayState} from "@heroui/react";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {  useForm, } from "react-hook-form";

export default function Home() {
  const state = useOverlayState()
  const {register,handleSubmit} = useForm({
    defaultValues:{
      username:"user",
    }
  })
  const {data,setData} = useState()
  const option = ["listener","speaker"] 
  const [selectedOption, setSelectedOption] = useState("")
  const [mode, setMode] = useState("")

// mode = "speaker"
// mode = "listener"
  function onSubmit(data) {
    console.log(JSON.stringify(data))
    state.close()
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
          <div className="flex justify-evenly mt-10 ">
            {option.map((option)=>{
              return(
                <Button key={option} className="font-bold bg-[#44444E] text-xl shadow-sm shadow-[#D3DAD9]" 
                onPress={() => {
      setSelectedOption(option)
      state.open()
    }}
                  >
                    {option}
            </Button>
              )
            })}
          </div>
          {/*<----- DialogUI ------>*/}
          <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen} >  
        <Modal.Container >
          <Modal.Dialog className="sm:max-w-[360px] bg-[#44444E] text-[#D3DAD9]">
            <Modal.Header>
              <Modal.Icon>
               <UserRound />
              </Modal.Icon>
              <Modal.Heading>{selectedOption === "listener" ? "สร้างห้องและพูดคุยกับผู้ฟัง" : "สุ่มเลือกผู้ฟังโดยการเลือกประเภท"}</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
            {selectedOption === "listener" ? (<form onSubmit={handleSubmit(onSubmit)} className="grid">
              <select {...register("total_people", { required: true })} className="border-2 border-[#37353E] p-2 rounded-2xl bg-[#37353E]">
        <option value="" className="">จำนวนผู้รับฟัง...</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <input type="submit" className="border-2 rounded-2xl mt-2 p-2 border-[#37353E] text-[#D3DAD9] bg-[#37353E] hover:bg-[#37353E]/80 "/>
            </form>) : selectedOption === "speaker" ? (<form onSubmit={handleSubmit(onSubmit)} className="grid">
              <select {...register("choose_client", { required: true })} className="border-2 border-[#37353E] p-2 rounded-2xl bg-[#37353E]">
        <option value="" className="">เลือกประเภทผู้ฟัง</option>
        <option value="love">เรื่องความรัก</option>
        <option value="job">เรื่องงาน</option>
        <option value="family">เรื่องครอบครัว</option>
        <option value="other">เรื่องอื่นๆ..</option>
      </select>
      <input type="submit" className="border-2 rounded-2xl mt-2 p-2 border-[#37353E] text-[#D3DAD9] bg-[#37353E] hover:bg-[#37353E]/80 "/>
            </form>) : ""}
          
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full -mt-2 p-2" slot="close" variant="danger" >
                ยกเลิก
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
        </section>
      </main>
    </div>
  );
}
