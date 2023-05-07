import { BiCategory, BiUserPin, BiBarChartSquare } from "react-icons/bi";
import {
  BsBox,
  BsTruck,
  BsCashStack,
  BsCart2,
  BsBagPlus,
  BsPeople,
  BsGear,
} from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";

type SidebarNav = {
  name: string;
  value: string;
  path: string;
  icon: JSX.Element;
};

const SidebarData: SidebarNav[] = [
  {
    name: "Dashboard",
    value: "dashboard",
    path: "/",
    icon: <BiBarChartSquare />,
  },
  {
    name: "Kategori",
    value: "categories",
    path: "/kategori",
    icon: <BiCategory className="stroke-[0.5px]" />,
  },
  {
    name: "Produk",
    value: "products",
    path: "/produk",
    icon: <BsBox className="stroke-[0.5px]" />,
  },
  {
    name: "Supplier",
    value: "suppliers",
    path: "/supplier",
    icon: <BsTruck className="stroke-[0.5px]" />,
  },
  {
    name: "Kasir",
    value: "cashier",
    path: "/kasir",
    icon: <BsCashStack className="stroke-[0.5px]" />,
  },
  {
    name: "Penjualan",
    value: "sales",
    path: "/penjualan",
    icon: <BsCart2 className="stroke-[0.5px]" />,
  },
  {
    name: "Pembelian",
    value: "purchases",
    path: "/pembelian",
    icon: <BsBagPlus className="stroke-[0.5px]" />,
  },
  {
    name: "Pelanggan",
    value: "customers",
    path: "/pelanggan",
    icon: <BsPeople className="stroke-[0.5px]" />,
  },
  {
    name: "User",
    value: "users",
    path: "/user",
    icon: <FiUsers className="stroke-[2.5px]" />,
  },
  {
    name: "Role",
    value: "roles",
    path: "/role",
    icon: <BiUserPin className="stroke-[0.5px] " />,
  },
];

export { SidebarData };
