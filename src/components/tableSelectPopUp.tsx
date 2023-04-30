import { motion } from "framer-motion";
import { useMemo } from "react";
import { toast } from "react-toastify";

interface TableSelectPopUpProps {
  selectedFlatRows: any;
  toggleAllRowsSelected: (arg0: boolean) => void;
  deleteFunction: (id: string[]) => Promise<void>;
  mutate: () => void;
  onClose: () => void;
}

const panelVariants = {
  open: {
    y: 0,
    opacity: 1,
    display: "flex",
  },
  closed: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export default function TableSelectPopUP({
  selectedFlatRows,
  toggleAllRowsSelected,
  deleteFunction,
  mutate,
  onClose,
}: TableSelectPopUpProps) {
  const selectedIds = useMemo(() => {
    return selectedFlatRows.map((row: any) => row.original.id);
  }, [selectedFlatRows]);

  const handleDelete = async () => {
    const confirm = window.confirm(
      `Are you sure you want to delete ${selectedIds.length} items?`
    );
    if (confirm) {
      await deleteFunction(selectedIds);
      mutate();
      onClose();
      toast.success("Sukses menghapus data", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <motion.div
      variants={panelVariants}
      initial="closed"
      animate={selectedFlatRows.length > 0 ? "open" : "closed"}
      className={`flex border px-6 py-3 bg-white rounded-3xl shadow-md gap-20 fixed bottom-10 transform md:bottom-[5rem] left-[15%] sm:left-[25%] md:left-[35%] lg:left-1/2 translate-x-1/2`}
    >
      <div className="flex items-center gap-2 h-fit">
        <p className="text-base gap-1">
          <span className="font-semibold">{selectedFlatRows.length}</span>{" "}
          selected
        </p>
        <button
          type="button"
          className="border-2 px-1 rounded-[0.250rem] text-base border-black hover:bg-[#e4e9ec]"
          onClick={() => {
            toggleAllRowsSelected(false);
          }}
        >
          reset
        </button>
      </div>
      <button
        className="text-sm font-semibold text-blue-500"
        onClick={handleDelete}
      >
        Delete
      </button>
    </motion.div>
  );
}
