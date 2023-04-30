import { Navigate, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/sidebar";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Layout({ children, open, setOpen }: Props) {
  return (
    <div className="flex min-h-[100svh]">
      <div className="bg-gray-400 fixed top-0 w-full h-10 lg:hidden text-right">
        <button className="mr-5 text-2xl" onClick={() => setOpen(!open)}>
          =
        </button>
      </div>
      <Sidebar open={open} setOpen={setOpen} />
      <div
        className={`mt-10 lg:mt-5 w-full lg:ml-[15.5rem] ml-0 bg-[#f8f9fa] text-[#16161a]`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Root() {
  const [open, setOpen] = useState(false);
  return (
    <AnimatePresence>
      <Layout open={open} setOpen={setOpen}>
        <Outlet />
      </Layout>
    </AnimatePresence>
  );
}
