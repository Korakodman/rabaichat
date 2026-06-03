'use client'
import { Button,Modal ,useOverlayState} from "@heroui/react";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {  useForm, } from "react-hook-form";

export default function Home() {
  const state = useOverlayState()
  const {register,handleSubmit} = useForm()
  const {data,SetData} = useState("")

  function onSubmit(data) {
    alert(data.total_people)
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
            <Button className="font-bold bg-[#44444E] text-xl shadow-sm shadow-[#D3DAD9]" onPress={state.open} >เริ่มระบาย</Button>
            <Button className="font-bold bg-[#44444E] text-xl  shadow-sm shadow-[#D3DAD9]">เข้าร่วมเป็นผู้ฟัง</Button>
          </div>
          {/*<----- DialogUI ------>*/}
          <Modal.Backdrop isOpen={state.isOpen} onOpenChange={state.setOpen} >
        <Modal.Container >
          <Modal.Dialog className="sm:max-w-[360px] bg-[#44444E] text-[#D3DAD9]">
            <Modal.Header>
              <Modal.Icon>
               <UserRound />
              </Modal.Icon>
              <Modal.Heading>สร้างห้องและพูดคุยกับผู้ฟัง</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)} className="grid">
              <select {...register("total_people", { required: true })} className="border-2 border-[#37353E] p-2 rounded-2xl bg-[#37353E]">
        <option value="" className="">จำนวนผู้รับฟัง...</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <input type="submit" className="border-2 rounded-2xl mt-2 p-2 border-[#37353E] text-[#D3DAD9] bg-[#37353E]"/>
            </form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full -mt-2" slot="close" variant="danger" >
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
