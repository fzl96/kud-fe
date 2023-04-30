import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../data/sidebarNav";
import { useMatch } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  return (
    <>
      <div
        className={`w-full md:w-96 lg:w-[15.5rem] bg-white border-slate-300 border-opacity-75 border-r-[1.5px] h-[100svh] fixed lg:left-0 z-[100] ${
          open ? "left-0" : "left-full"
        }`}
      >
        <button
          className="flex m-5 lg:hidden text-2xl"
          onClick={() => setOpen(false)}
        >
          <MdClose className="outline-none" />
        </button>
        <ul className="flex flex-col gap-2 text-base m-5">
          {SidebarData.map((item, index) => (
            <motion.li
              key={index}
              whileTap={{ scale: 0.9 }}
              className={`hover:bg-[#e4e9ec] rounded-md transition-colors duration-150 ${
                useMatch(item.path)
                  ? "bg-[#e4e9ec]"
                  : "text-slate-500 hover:text-black bg-transparent"
              }`}
            >
              <Link to={item.path} onClick={() => setOpen(false)}>
                <div className="flex items-center px-3 py-[0.65rem]">
                  <div className="mr-3 text-lg">{item.icon}</div>
                  <div>{item.name}</div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}
