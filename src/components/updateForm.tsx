import { useForm, useController } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import { useMemo, useState } from "react";
import Select from "react-select";
import { BiKey } from "react-icons/bi";

type Fields = {
  name: string;
  label: string;
  type: string;
  options?: any;
  description?: string;
  disabled?: boolean;
  required: boolean;
  multiple?: boolean;
  icon?: React.ReactNode;
};

interface FormProps {
  fields: Fields[];
  cacheKey: string;
  rowSelected: any;
  onClose: () => void;
  getSingleData: (id: string) => Promise<any>;
  updateFunction: (id: string, data: any) => Promise<void>;
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

export default function UpdateForm({
  onClose,
  cacheKey,
  getSingleData,
  rowSelected,
  fields,
  updateFunction,
  mutate,
}: FormProps) {
  const {
    data,
    isLoading,
    error,
    mutate: mutateSingle,
  } = useSWR(`${cacheKey}/${rowSelected.id}`, () =>
    getSingleData(rowSelected.id)
  );

  const { register, handleSubmit, reset, watch, control } = useForm({
    defaultValues: data,
    values: data,
  });

  const { field: controlField } = useController({
    name: fields.find((field) => field.type === "select")?.name || "",
    control,
  });

  const watchAllFields = watch();
  const isDisabled = useMemo(() => {
    return Object.keys(watchAllFields).every(
      (key) => watchAllFields[key] === data?.[key]
    );
  }, [watchAllFields, data]);

  const handleSelectChange = (value: any) => {
    if (Array.isArray(value)) {
      controlField.onChange(value.map((item) => item.value));
      return;
    }
    controlField.onChange(value.value);
  };

  if (error) return <div>failed to load</div>;

  return (
    <form
      className="flex flex-col gap-4 mt-5 ml-1"
      onSubmit={handleSubmit(async (data) => {
        if (data.newPassword) {
          const newPassword = data.newPassword;
          const confirmPassword = data.confirmPassword;
          if (newPassword !== confirmPassword) {
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
        }
        try {
          await updateFunction(rowSelected.id, data);
          mutate();
          onClose();
          mutateSingle();
          reset();
          toast.success("Sukses memperbarui data", {
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
          toast.error("Gagal memperbarui data", {
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
      <div className="flex flex-col gap-6 mb-20">
        <div className="flex flex-col px-4 py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 opacity-90">
          <label
            htmlFor="id"
            className="text-sm flex items-center gap-1 font-semibold after:content-['*'] after:text-red-500 after:ml-1"
          >
            <span>
              <BiKey />
            </span>
            ID
          </label>
          {isLoading ? (
            <Skeleton
              baseColor="#eaeef1"
              highlightColor="#f7f8fa"
              className="h-[0.35rem] py-0"
            />
          ) : (
            <input
              disabled
              value={rowSelected.id}
              type="text"
              className="bg-transparent outline-none text-sm pt-1"
            />
          )}
        </div>
        {fields.map((field) => {
          if (field.type === "select") {
            return (
              <div
                key={field.name}
                className="flex flex-col py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 "
              >
                <label
                  htmlFor={field.name}
                  className={`text-sm font-semibold px-3 flex items-center gap-1 ${
                    field.required && "after:content-['*'] after:text-red-500"
                  }`}
                >
                  <span className="text-xs">{field.icon ?? ""}</span>
                  {field.label}
                </label>
                {isLoading ? (
                  <div className="px-3">
                    <Skeleton
                      baseColor="#eaeef1"
                      highlightColor="#f7f8fa"
                      className="h-[0.35rem]  py-0"
                    />
                  </div>
                ) : (
                  <div key={field.name}>
                    <Select
                      className="border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-none"
                      options={field.options}
                      styles={customStyles}
                      isMulti={field.multiple}
                      value={field.options.find(
                        (option: any) => option === controlField.value
                      )}
                      defaultValue={field.options.filter((option: any) => {
                        if (data.permissions)
                          return data.permissions.includes(option.value);
                        else if (data.category)
                          return data.category.id.includes(option.value);
                        else if (data.role)
                          return data.role.id.includes(option.value);
                      })}
                      onChange={handleSelectChange}
                    />
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div
                key={field.name}
                className={`flex flex-col px-4 py-3  rounded-sm bg-[#e4e9ec] focus-within:bg-[#d7dde4] text-slate-500 focus-within:text-black transition-colors duration-150 ${
                  field.disabled ? "opacity-70 pointer-event-none" : ""
                }`}
              >
                <label
                  htmlFor={field.name}
                  className={`text-sm font-semibold flex items-center gap-1 ${
                    field.required && "after:content-['*'] after:text-red-500"
                  }`}
                >
                  <span className="text-xs">{field.icon ?? ""}</span>
                  {field.label}
                </label>
                {isLoading ? (
                  <Skeleton
                    baseColor="#eaeef1"
                    highlightColor="#f7f8fa"
                    className="h-[0.35rem] py-0"
                  />
                ) : (
                  <input
                    {...register(field.name, {
                      required: field.required,
                      valueAsNumber: field.type === "number" ? true : false,
                    })}
                    type={field.type}
                    className={`bg-transparent outline-none text-sm text-gray-600`}
                    disabled={field.disabled}
                  />
                )}
                {field.description && (
                  <small className="text-xs text-gray-500">
                    {field.description}
                  </small>
                )}
              </div>
            );
          }
        })}
      </div>
      <div className="bottom-10 fixed border-t bg-white border-gray-300 pt-5 left-0 w-full">
        <div className="float-right mr-5">
          <button
            className="px-3 py-2 hover:bg-[#e4e9ec] rounded-md"
            onClick={() => {
              onClose();
              reset();
            }}
            type="button"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isDisabled}
            className={`px-4 py-2 bg-gray-900 rounded-md text-white ml-2 hover:bg-[#2d2d30] ${
              isDisabled && "opacity-30 cursor-default pointer-events-none"
            }`}
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
}
