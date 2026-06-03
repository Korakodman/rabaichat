"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";
import { House, Search, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
const MainNavbar = () => {
  const pathname = usePathname();
  const route = useRouter();
  const [isLogout,setisLogout] = useState(false)
  // object menu path
  const menus = [
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "Chat-Room",
      path: "/Chat-Room",
      icon: Search,
    },
    {
      name: "Setting",
      path: "/Setting",
      icon: Settings,
    },
  ];
  return (
    <nav className="bg-[#44444E] h-screen w-48 p-4 text-[#D3DAD9] relative ">
      {/* <----- header -----> */}
      <header>
        <h1 className="text-2xl p-2 ml-2">RaBaiChat</h1>
      </header>
      {/* <----- Menu -----> */}
      <div className="menu-navbar ">
        <ul className="font-bold mt-20">
          {menus.map((menu, index) => {
            const isActive = pathname === menu.path;
            const Icon = menu.icon;
            return (
              <li
                className={`
            mt-4
        flex items-center gap-3
        px-4 py-3 rounded-xl
        cursor-pointer transition-all duration-200
        font-medium

        ${
          isActive
            ? "bg-[#D3DAD9] text-black shadow-md "
            : "hover:bg-[#D3DAD9]/20 "
        }
      `}
                key={index}
                onClick={() => route.push(menu.path)}
              >
                <Icon size={20} />
                <span>{menu.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <---- ProfileUI  ---->*/}
      <div className="p-2 ">
        <Button
          variant="danger"
          className="p-2 bottom-10 absolute font-extrabold duration-200 hover:bg-red-500/80 hover:text-red-700 w-34 transition-all"
          onClick={()=>setisLogout(!false)}
          isDisabled={isLogout}
        >
            {isLogout ? "Logout..." : "Logout"}
        </Button>
      </div>
    </nav>
  );
};

export default MainNavbar;
