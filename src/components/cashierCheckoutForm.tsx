import { useState, useMemo, useRef } from "react";
import Select from "react-select";
import { postCashier, type Sale } from "../api/cashierApi";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import Receipt from "./receipt";
import ReactToPrint, { useReactToPrint } from "react-to-print";

interface Props {
  selectedItems: any;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  customers: any;
  mutate: () => void;
}

const customStyles = {
  menu: (provided: any) => ({
    ...provided,
    padding: "0.2rem 0.3rem 0 0.3rem",
  }),
  control: (provided: any) => ({
    ...provided,
    paddingLeft: "0.35rem",
    backgroundColor: "transparent",
    borderRadius: "none",
    border: "none",
    outline: "none",
    boxShadow: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#d7dde4" : "white",
    borderRadius: "0.2rem",
    marginBottom: "0.4rem",
    color: "black",
    "&:hover": {
      backgroundColor: "#d7dde4",
    },
  }),
  multiValue: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "0.1rem 0.2rem",
  }),
};

export default function CashierCheckoutForm({
  selectedItems,
  setSelectedItems,
  customers,
  mutate,
}: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [cash, setCash] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const componentRef = useRef<any>(null);
  const pageStyle = `{ size: 2in 3in }`;

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const options = useMemo(() => {
    return [
      {
        value: "",
        label: "-",
      },
      ...customers.map((customer: any) => ({
        value: customer.id,
        label: customer.name,
      })),
    ];
  }, [customers]);

  const handleSelectChange = (selectedCustomer: any) => {
    setSelectedCustomer(selectedCustomer);
  };

  const total = useMemo(() => {
    return selectedItems.reduce((acc: any, item: any) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [selectedItems]);

  const disabled = useMemo(() => {
    return isNaN(cash) || cash < total || selectedItems.length === 0;
  }, [selectedItems, cash, total]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data: Sale = {
      customerId: selectedCustomer.value,
      cash: cash,
      change: cash - total,
      products: selectedItems.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };
    try {
      await postCashier(data);
      handlePrint();
      toast.success("Sukses menambahkan data", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      setSelectedItems([]);
      setCash(0);
      setSelectedCustomer(customers[0]);
      mutate();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      }
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="customer" className="font-semibold">
              Customer
            </label>
            <Select
              className="border-gray-300 border-2 block w-full sm:text-sm rounded-md"
              options={options}
              styles={customStyles}
              onChange={handleSelectChange}
              closeMenuOnSelect={true}
              noOptionsMessage={() => null}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Cash" className="font-semibold">
              Cash
            </label>
            <input
              type="number"
              name="cash"
              id="cash"
              placeholder="Cash"
              className="border-gray-300 py-2 px-3 border-2 block w-full rounded-md"
              onChange={(e) => setCash(parseInt(e.target.value))}
              onBlur={(e) =>
                e.target.value === ""
                  ? setCash(0)
                  : setCash(parseInt(e.target.value))
              }
            />
          </div>
          <div className="flex justify-between text-xl">
            <h1>Subtotal</h1>
            <span>{currencyFormatter.format(total)}</span>
          </div>

          <div className="flex justify-between font-semibold text-2xl">
            <h1>Total</h1>
            <span>{currencyFormatter.format(total)}</span>
          </div>
          <div className="flex justify-between text-xl">
            <h1>Cash</h1>
            <span>{currencyFormatter.format(cash)}</span>
          </div>
          <div className="flex justify-between font-semibold text-2xl">
            <h1>Kembalian</h1>
            <span>{currencyFormatter.format(cash - total)}</span>
          </div>
          <button
            className={` ${
              disabled ? "bg-gray-500" : "bg-gray-800"
            } px-3 py-3 rounded-lg text-white`}
            disabled={disabled}
            type="submit"
          >
            Simpan
          </button>
        </div>
      </form>
      <div ref={componentRef} className="z-[-10] componentsToPrint">
        {selectedItems && (
          <Receipt
            selectedItems={selectedItems}
            cash={cash || 0}
            change={cash - total || 0}
            totalPrice={total || 0}
          />
        )}
      </div>
    </>
  );
}
