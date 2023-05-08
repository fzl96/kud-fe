import { useForm, useController } from "react-hook-form";
import { toast } from "react-toastify";
import Select from "react-select";
import { BiKey } from "react-icons/bi";
import { useState } from "react";
import { isAxiosError } from "axios";

type Fields = {
  name: string;
  label: string;
  type: string;
  options?: any;
  description?: string;
  disabled?: boolean;
  required: boolean;
  multiple?: boolean;
  icon?: any;
};

interface FormProps {
  mutate: () => void;
  fields: Fields[];
  onClose: (data?: any) => void;
  createFunction: (data: any) => Promise<void>;
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

export default function Form({
  mutate,
  onClose,
  fields,
  createFunction,
}: FormProps) {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, control, setValue } = useForm();

  const { field: controlField } = useController({
    name: fields.find((field) => field.type === "select")?.name || "",
    control,
  });

  const handleSelectChange = (value: any) => {
    if (Array.isArray(value)) {
      controlField.onChange(value.map((item) => item.value));
    } else controlField.onChange(value.value);
  };

  return (
    <form
      className="flex flex-col gap-4 ml-1 mb-10"
      onSubmit={handleSubmit(async (data) => {
        // validate password and confirm password
        const password = data.password;
        const confirmPassword = data.confirmPassword;
        if (password !== confirmPassword) {
          toast.error("Password tidak sama", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          return;
        }
        try {
          await createFunction(data);
          mutate();
          onClose(controlField.onChange);
          reset();
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
        } catch (err) {
          if (isAxiosError(err) && err.response?.data?.error) {
            setError(err.response.data.error);
            return;
          }
          console.log(err);
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
          onClose();
        }
      })}
    >
      <div className="flex flex-col gap-6">
        {fields.map((field) => {
          if (field.type === "select") {
            return (
              <div
                key={field.name}
                className="flex flex-col py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 "
              >
                <label
                  htmlFor={field.name}
                  className={`text-sm font-semibold flex items-center gap-2 ${
                    field.required &&
                    "after:content-['*'] after:text-red-500 px-4"
                  }`}
                >
                  <span className="text-xs">{field.icon ?? ""}</span>
                  {field.label}
                </label>
                <Select
                  className="border-gray-300 shadow-sm block w-full sm:text-sm rounded-none"
                  options={field.options}
                  styles={customStyles}
                  value={field.options.find(
                    (option: any) => option === controlField.value
                  )}
                  onChange={handleSelectChange}
                  isMulti={field.multiple}
                  closeMenuOnSelect={!field.multiple}
                  noOptionsMessage={() => null}
                />
              </div>
            );
          } else {
            return (
              <div
                key={field.name}
                className="flex flex-col px-4 py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 "
              >
                <label
                  htmlFor={field.name}
                  className={`text-sm font-semibold flex items-center gap-2 ${
                    field.required && " after:content-['*'] after:text-red-500"
                  }`}
                >
                  <span className="text-xs">{field.icon ?? ""}</span>
                  {field.label}
                </label>
                <input
                  {...register(field.name, {
                    required: field.required,
                    valueAsNumber: field.type === "number" ? true : false,
                  })}
                  type={field.type}
                  className="bg-transparent outline-none text-sm text-black"
                  onChange={(e) => setError("")}
                />
              </div>
            );
          }
        })}
      </div>
      <div className="bottom-20 md:bottom-10 px-5 flex items-center justify-between fixed border-t border-gray-300 pt-5 left-0 w-full">
        <div>{error && <p className="text-red-600">Error: {error}</p>}</div>
        <div className="">
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
  );
}
