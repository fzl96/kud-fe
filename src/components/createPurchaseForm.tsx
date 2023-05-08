import { toast } from "react-toastify";
import Select from "react-select";
import { useState, useMemo } from "react";

interface Props {
  products: any;
  suppliers: any;
  mutate: () => void;
  onClose: () => void;
  createPurchase: (data: any) => Promise<void>;
  existingProducts?: any;
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

export default function CreatePurchaseForm({
  products,
  mutate,
  onClose,
  suppliers,
  createPurchase,
  existingProducts,
}: Props) {
  const [selectedProducts, setSelectedProducts] = useState<any>(
    existingProducts || []
  );
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const productOptions = useMemo(() => {
    return products.map((product: any) => ({
      value: product.id,
      label: product.name,
      purchasePrice: 1,
      quantity: 1,
    }));
  }, [products]);

  const supplierOptions = useMemo(() => {
    return suppliers.map((supplier: any) => ({
      value: supplier.id,
      label: supplier.name,
    }));
  }, [suppliers]);

  const handleProductChange = (selectedOption: any) => {
    setSelectedProducts(selectedOption);
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const updatedProducts = selectedProducts.map((product: any) => {
      if (product.value === productId) {
        return {
          ...product,
          quantity: parseInt(event.target.value),
          total: parseInt(event.target.value) * product.purchasePrice || 1,
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const handlePurchasePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    const updatedProducts = selectedProducts.map((product: any) => {
      if (product.value === productId) {
        return {
          ...product,
          purchasePrice: parseInt(event.target.value),
          total: parseInt(event.target.value) * product.quantity || 1,
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSupplier) {
      toast.error("Please select a supplier");
      return;
    }
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product");
      return;
    }
    const data = {
      supplierId: selectedSupplier.value,
      items: selectedProducts.map((product: any) => ({
        id: product.value,
        purchasePrice: product.purchasePrice,
        quantity: product.quantity,
      })),
    };
    try {
      await createPurchase(data);
      mutate();
      onClose();
      toast.success("Berhasil menambahkan data", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Gagal menambahkan data", {
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
    <>
      <div className="flex flex-col gap-6 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-[5rem] flex flex-col gap-4">
            <div className="flex flex-col py-3 rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 ">
              <label
                htmlFor="supplier"
                className={`text-sm font-semibold ${"after:content-['*'] after:text-red-800 after:ml-1 px-4"}`}
              >
                Supplier
              </label>
              <Select
                className="border-gray-300 shadow-sm block w-full sm:text-sm rounded-none"
                options={supplierOptions}
                styles={customStyles}
                value={selectedSupplier}
                onChange={setSelectedSupplier}
              />
            </div>
            <div className="flex flex-col py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 ">
              <label
                htmlFor="product"
                className={`text-sm font-semibold ${"after:content-['*'] after:text-red-800 after:ml-1 px-4"}`}
              >
                Products
              </label>
              <Select
                className="border-gray-300 shadow-sm block w-full sm:text-sm rounded-none"
                options={productOptions}
                styles={customStyles}
                value={selectedProducts}
                onChange={handleProductChange}
                isMulti={true}
                isSearchable={false}
              />
            </div>
            {selectedProducts?.map((product: any, index: number) => (
              <div
                key={index}
                className="flex flex-col px-4 py-3 rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 "
              >
                <label
                  htmlFor="product"
                  className={`text-sm font-semibold ${"after:content-['*'] after:text-red-800 after:ml-1"}`}
                >
                  {product.label}
                </label>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="flex flex-1 flex-col">
                    <label
                      htmlFor={product.label + "quantity"}
                      className="text-sm py-1"
                    >
                      Quantity:{" "}
                    </label>
                    <input
                      type="number"
                      name={product.label + "quantity"}
                      min={1}
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(e, product.value)}
                      className="px-2 py-1 outline-none border-none rounded-[0.275rem]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <label
                      htmlFor={product.label + "purchasePrice"}
                      className="text-sm py-1"
                    >
                      Harga beli: Rp{" "}
                    </label>
                    <input
                      type="number"
                      name={product.label + "purchasePrice"}
                      value={product.purchasePrice}
                      onChange={(e) =>
                        handlePurchasePriceChange(e, product.value)
                      }
                      className="px-2 py-1 outline-none border-none rounded-[0.275rem]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bottom-20 md:bottom-0 absolute border-t bg-white py-5 border-gray-300 left-0 w-full">
            <div className="float-right mr-5">
              <button
                className="px-3 py-2 hover:bg-[#e4e9ec] rounded-md"
                onClick={onClose}
                type="button"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 rounded-md text-white ml-2 hover:bg-[#2d2d30]"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
