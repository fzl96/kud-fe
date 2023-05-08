import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../data/sidebarNav";
import { useMatch } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";
import { useAuth } from "../context/authContext";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../api/auth";

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const filteredSidebarData = useMemo(() => {
    return SidebarData.filter((item) =>
      auth?.user?.role.permissions.includes(item.value)
    );
  }, [auth]);

  const handleLogout = async () => {
    localStorage.removeItem("isAuth");
    setAuth(null);
    const response = await logout();
    console.log(response);
    window.location.href = "/login";
  };

  return (
    <>
      <div
        className={`w-full md:w-96 lg:w-[15.5rem] bg-white border-slate-300 border-opacity-75 border-r-[1.5px] h-[100svh] fixed lg:left-0 z-[100] ${
          open ? "left-0" : "left-full"
        }`}
      >
        <div className="lg:hidden text-right">
          <button
            className="p-2 mx-4 mt-2 text-lg rounded-md text-[#a285e1] bg-[#e5defe]"
            onClick={() => setOpen(false)}
          >
            <MdClose className="outline-none" />
          </button>
        </div>
        <div className="h-full flex flex-col justify-between">
          <ul className="flex flex-col gap-2 text-base m-5">
            {filteredSidebarData.map((item, index) => (
              <motion.li
                key={index}
                whileTap={{ scale: 0.9 }}
                className={`hover:bg-[#e5defe]  hover:text-[#a285e1] rounded-md transition-colors duration-150 ${
                  useMatch(item.path)
                    ? "bg-[#e5defe] text-[#a285e1]"
                    : "text-slate-500 bg-transparent hover:text-[#a285e1]"
                }`}
              >
                <Link to={item.path} onClick={() => setOpen(false)}>
                  <div className="flex items-center px-3 py-[0.65rem]">
                    <div
                      className={`${
                        useMatch(item.path) ? "text-[#a285e1]" : " "
                      } mr-3 text-lg font-extralight bg-white p-2 rounded-lg`}
                    >
                      {item.icon}
                    </div>
                    <div className="font-semibold ">{item.name}</div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
          <div className="mb-[6rem] md:mb-10 mx-5">
            <button
              onClick={() => handleLogout()}
              className="group w-full flex items-center px-3 py-[0.65rem] text-slate-500  hover:text-[#a285e1] "
            >
              <span className="mr-3 text-lg font-lg bg-white p-2 rounded-lg group-hover:translate-x-[-0.5rem] transition-transform duration-150">
                <BiLogOut />
              </span>
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
