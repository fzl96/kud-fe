import { BiKey, BiGitBranch, BiUser } from "react-icons/bi";
import { BsCalendar2 } from "react-icons/bs";
import { RiLockPasswordLine, RiText } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { FiHash } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";

export const categoriesField = [
  {
    name: "name",
    label: "Nama",
    type: "text",
    required: true,
    icon: <RiText />,
  },
];

export const createProductsField = (options: any) => {
  return [
    {
      name: "name",
      label: "Nama",
      type: "text",
      required: true,
      icon: <RiText />,
    },
    {
      name: "categoryId",
      label: "Kategori",
      type: "select",
      required: true,
      options: options,
      icon: <BiGitBranch />,
    },
    {
      name: "price",
      label: "Harga",
      type: "number",
      required: true,
      icon: <IoPricetagOutline />,
    },
    {
      name: "stock",
      label: "Stok",
      type: "number",
      required: true,
      description: "Stok bisa ditambah melalui pembelian",
      disabled: true,
      icon: <FiHash />,
    },
  ];
};

export const suppliersField = [
  {
    name: "name",
    label: "Nama",
    type: "text",
    required: true,
    icon: <RiText />,
  },
  {
    name: "address",
    label: "Alamat",
    type: "text",
    required: false,
    icon: <FaRegAddressCard />,
  },
  {
    name: "phone",
    label: "No. Telepon",
    type: "text",
    required: false,
    icon: <AiOutlinePhone />,
  },
];

export const customersField = [
  {
    name: "name",
    label: "Nama",
    type: "text",
    required: true,
    icon: <RiText />,
  },
  {
    name: "phone",
    label: "No. Telepon",
    type: "text",
    required: false,
    icon: <AiOutlinePhone />,
  },
];

export const createRolesField = (options: any) => {
  return [
    {
      name: "name",
      label: "Nama",
      type: "text",
      required: true,
      icon: <RiText />,
    },
    {
      name: "permissions",
      label: "Hak Akses",
      type: "select",
      multiple: true,
      required: true,
      options: options,
      icon: <BiKey />,
    },
  ];
};

export const createUsersField = (options: any) => {
  return [
    {
      name: "name",
      label: "Nama",
      type: "text",
      required: true,
      icon: <RiText />,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      icon: <BiUser />,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      icon: <RiLockPasswordLine />,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
      icon: <RiLockPasswordLine />,
    },
    {
      name: "roleId",
      label: "Role",
      type: "select",
      required: true,
      options: options,
      icon: <BiKey />,
    },
  ];
};

export const updateUsersField = (options: any) => {
  return [
    {
      name: "name",
      label: "Nama",
      type: "text",
      required: true,
      icon: <RiText />,
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      icon: <BiUser />,
    },
    {
      name: "newPassword",
      label: "Password Baru",
      type: "password",
      required: false,
      icon: <RiLockPasswordLine />,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: false,
      icon: <RiLockPasswordLine />,
    },
    {
      name: "currentPassword",
      label: "Password Lama",
      type: "password",
      required: false,
      icon: <RiLockPasswordLine />,
    },
    {
      name: "roleId",
      label: "Role",
      type: "select",
      required: true,
      options: options,
      icon: <BiKey />,
    },
  ];
};
