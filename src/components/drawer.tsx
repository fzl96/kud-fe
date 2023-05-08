import { easeOut, motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

interface DrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const panelVariants = {
  open: {
    x: "0%",
    opacity: 1,
    display: "block",
    transition: {
      duration: 0.15,
      ease: easeOut,
    },
  },
  closed: {
    x: "20%",
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: easeOut,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const overlayVariants = {
  open: {
    display: "block",
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: easeOut,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: easeOut,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export default function Drawer({ children, open, onClose }: DrawerProps) {
  return (
    <>
      <motion.div
        variants={overlayVariants}
        animate={open ? "open" : "closed"}
        className={`fixed ${
          !open ? "hidden" : "block"
        } left-0 top-0 w-full h-screen bg-[#35476840] z-[1001] `}
        onClick={onClose}
      />
      <motion.div
        variants={panelVariants}
        animate={open ? "open" : "closed"}
        className={`fixed p-6
          right-0 top-0 w-full md:w-[45rem] h-screen bg-white z-[1001] ${
            open ? "block" : "hidden"
          } `}
      >
        <button
          onClick={onClose}
          className="flex group text-[#a285e1] font-semibold"
        >
          <IoIosArrowBack className="text-2xl group-hover:translate-x-[-0.5rem] transition-transform duration-150 ease-in" />
          <span className="">Kembali</span>
        </button>
        <div className="h-[43rem] mt-4 overflow-y-auto">{children}</div>
      </motion.div>
    </>
  );
}
