import { BiKey, BiGitBranch, BiUser } from "react-icons/bi";
import { BsCalendar2 } from "react-icons/bs";
import { RiLockPasswordLine, RiText } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";
import { IoPricetagOutline } from "react-icons/io5";
import { FiHash } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";

export type TableHeader = {
  title: string;
  icon: JSX.Element;
};

export const categoriesHeader: TableHeader[] = [
  {
    title: "ID",
    icon: <BiKey className="stroke-[0.5px]" />,
  },
  {
    title: "Name",
    icon: <RiText />,
  },
  {
    title: "Created",
    icon: <BsCalendar2 className="stroke-[0.5px]" />,
  },
  {
    title: "Updated",
    icon: <MdOutlineContentCopy />,
  },
];

export const productsHeader: TableHeader[] = [
  {
    title: "ID",
    icon: <BiKey className="stroke-[0.5px]" />,
  },
  {
    title: "Name",
    icon: <RiText />,
  },
  {
    title: "Category",
    icon: <BiGitBranch />,
  },
  {
    title: "Price",
    icon: <IoPricetagOutline />,
  },
  {
    title: "Stock",
    icon: <FiHash />,
  },
  {
    title: "Created",
    icon: <BsCalendar2 className="stroke-[0.5px]" />,
  },
  {
    title: "Updated",
    icon: <MdOutlineContentCopy />,
  },
];

export const suppliersHeader: TableHeader[] = [
  {
    title: "ID",
    icon: <BiKey className="stroke-[0.5px]" />,
  },
  {
    title: "Name",
    icon: <RiText />,
  },
  {
    title: "Address",
    icon: <FaRegAddressCard />,
  },
  {
    title: "Phone",
    icon: <AiOutlinePhone />,
  },
  {
    title: "Created",
    icon: <BsCalendar2 className="stroke-[0.5px]" />,
  },
  {
    title: "Updated",
    icon: <MdOutlineContentCopy />,
  },
];

export const customersHeader: TableHeader[] = [
  {
    title: "ID",
    icon: <BiKey className="stroke-[0.5px]" />,
  },
  {
    title: "Name",
    icon: <RiText />,
  },
  {
    title: "Phone",
    icon: <AiOutlinePhone />,
  },
  {
    title: "Created",
    icon: <BsCalendar2 className="stroke-[0.5px]" />,
  },
  {
    title: "Updated",
    icon: <MdOutlineContentCopy />,
  },
];

export const rolesHeader: TableHeader[] = [
  {
    title: "ID",
    icon: <BiKey className="stroke-[0.5px]" />,
  },
  {
    title: "Name",
    icon: <RiText />,
  },
  {
    title: "Hak Akses",
    icon: <RiLockPasswordLine />,
  },
  {
    title: "Created",
    icon: <BsCalendar2 className="stroke-[0.5px]" />,
  },
  {
    title: "Updated",
    icon: <MdOutlineContentCopy />,
  },
];

export const usersHeader: TableHeader[] = [
  {
    title: "ID",
    icon: <BiKey className="stroke-[0.5px]" />,
  },
  {
    title: "Name",
    icon: <RiText />,
  },
  {
    title: "Username",
    icon: <BiUser />,
  },
  {
    title: "Role",
    icon: <BiGitBranch />,
  },
  {
    title: "Created",
    icon: <BsCalendar2 className="stroke-[0.5px]" />,
  },
  {
    title: "Updated",
    icon: <MdOutlineContentCopy />,
  },
];

export const purchasesHeader: TableHeader[] = [
  {
    title: "ID",
    icon: <BiKey className="stroke-[0.5px]" />,
  },
  {
    title: "Supplier",
    icon: <BiGitBranch />,
  },
  {
    title: "Total",
    icon: <IoPricetagOutline />,
  },
  {
    title: "Created",
    icon: <BsCalendar2 className="stroke-[0.5px]" />,
  },
  {
    title: "Updated",
    icon: <MdOutlineContentCopy />,
  },
];

export const salesHeader: TableHeader[] = [
  {
    title: "ID",
    icon: <BiKey className="stroke-[0.5px]" />,
  },
  {
    title: "Kasir",
    icon: <BiUser />,
  },
  {
    title: "Customer",
    icon: <BiGitBranch />,
  },
  {
    title: "Total",
    icon: <IoPricetagOutline />,
  },
  {
    title: "Created",
    icon: <BsCalendar2 className="stroke-[0.5px]" />,
  },
  {
    title: "Updated",
    icon: <MdOutlineContentCopy />,
  },
];
