import { BiGitBranch, BiKey, BiUser } from "react-icons/bi";
import { BsCalendar2 } from "react-icons/bs";
import { RiLockPasswordLine, RiText } from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";
import { format } from "date-fns";
import { FiHash } from "react-icons/fi";
import { IoPricetagOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import { AiOutlinePhone } from "react-icons/ai";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const idColumn = {
  Header: (
    <div className="flex items-center">
      <span className="mr-2 text-base ">
        <BiKey className="stroke-[0.5px]" />
      </span>
      <span>ID</span>
    </div>
  ),
  Cell: ({ row }: any) => {
    return (
      <div className="flex items-center bg-[#d7dde4] rounded-lg w-fit py-1 px-2">
        <button
          className="mr-2 text-slate-600"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(row.original.id);
          }}
        >
          <MdOutlineContentCopy />
        </button>
        <span>{row.original.id}</span>
      </div>
    );
  },
  accessor: "id",

  minWidth: 270,
};

const nameColumn = {
  Header: (
    <div className="flex items-center">
      <span className="mr-2 text-base">
        <RiText />
      </span>
      <span>Name</span>
    </div>
  ),
  Cell: ({ row }: any) => {
    return (
      <div className="w-fit p-1 text-[0.9063rem]">{row.original.name}</div>
    );
  },
  accessor: "name",
  minWidth: 200,
};

const createdColumn = {
  Header: (
    <div className="flex items-center">
      <span className="mr-2 text-base">
        <BsCalendar2 className="stroke-[0.5px]" />
      </span>
      <span>Created</span>
    </div>
  ),
  Cell: ({ row }: any) => {
    return (
      <div className="py-1 flex flex-col">
        <span className="text-[0.9063rem]">
          {format(new Date(row.original.createdAt), "dd-MM-yyyy")}
        </span>
        <span className="text-[0.8125rem text-gray-500">
          {format(new Date(row.original.updatedAt), "HH:mm:ss 'WIB'")}
        </span>
      </div>
    );
  },
  accessor: "createdAt",

  minWidth: 140,
};

const updatedColumn = {
  Header: (
    <div className="flex items-center">
      <span className="mr-2 text-base">
        <BsCalendar2 className="stroke-[0.5px]" />
      </span>
      <span>Updated</span>
    </div>
  ),
  Cell: ({ row }: any) => {
    return (
      <div className="py-1 flex flex-col">
        <span className="text-[0.9063rem]">
          {format(new Date(row.original.updatedAt), "dd-MM-yyyy")}
        </span>
        <span className="text-[0.8125rem] text-gray-500">
          {format(new Date(row.original.updatedAt), "HH:mm:ss 'WIB'")}
        </span>
      </div>
    );
  },
  accessor: "updatedAt",

  minWidth: 140,
};

const categoriesColumn = [idColumn, nameColumn, createdColumn, updatedColumn];
const productsColumn = [
  idColumn,
  nameColumn,
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <BiGitBranch />
        </span>
        <span>Category</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="flex items-center bg-[#d7dde4] rounded-lg w-fit py-1 px-3">
          {row.original.category.name}
        </div>
      );
    },
    accessor: "category.name",

    minWidth: 150,
  },
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <IoPricetagOutline />
        </span>
        <span>Price</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="w-fit p-1 text-[0.9063rem]">
          {formatter.format(row.original.price)}
        </div>
      );
    },
    accessor: "price",

    minWidth: 150,
  },
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <FiHash />
        </span>
        <span>Stock</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="w-fit p-1 text-[0.9063rem]">{row.original.stock}</div>
      );
    },
    accessor: "stock",

    minWidth: 150,
  },
  updatedColumn,
];

const suppliersColumn = [
  idColumn,
  nameColumn,
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <FaRegAddressCard />
        </span>
        <span>Alamat</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return <div className="flex items-center">{row.original.address}</div>;
    },
    accessor: "address",

    minWidth: 200,
  },
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <AiOutlinePhone />
        </span>
        <span>No. Telepon</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return <div className="flex items-center">{row.original.phone}</div>;
    },
    accessor: "phone",

    minWidth: 200,
  },
  createdColumn,
  updatedColumn,
];

const customersColumn = [
  idColumn,
  nameColumn,
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <AiOutlinePhone />
        </span>
        <span>No. Telepon</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return <div className="flex items-center">{row.original.phone}</div>;
    },
    accessor: "phone",

    minWidth: 250,
  },
  createdColumn,
  updatedColumn,
];

const rolesColumn = [
  idColumn,
  nameColumn,
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <RiLockPasswordLine />
        </span>
        <span>Hak Akses</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="flex flex-wrap gap-1">
          {row.original.permissions.map((permission: any, index: number) => {
            return (
              <div
                key={index}
                className="bg-[#d7dde4] rounded-lg w-fit py-1 px-3 mb-1"
              >
                {permission}
              </div>
            );
          })}
        </div>
      );
    },
    accessor: "permissions",

    minWidth: 300,
    maxWidth: 100,
  },
  createdColumn,
  updatedColumn,
];

const usersColumn = [
  idColumn,
  nameColumn,
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <BiUser />
        </span>
        <span>Username</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return <div className="flex items-center">{row.original.username}</div>;
    },
    accessor: "username",
  },
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <BiGitBranch />
        </span>
        <span>Role</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="flex items-center bg-[#d7dde4] rounded-lg w-fit py-1 px-3">
          {row.original.role.name}
        </div>
      );
    },
    accessor: "role.name",
  },
  createdColumn,
  updatedColumn,
];

const purchasesColumn = [
  idColumn,
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <BiGitBranch />
        </span>
        <span>Supplier</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="flex items-center bg-[#d7dde4] rounded-lg w-fit py-1 px-3">
          {row.original.supplier.name}
        </div>
      );
    },
    accessor: "supplier.name",
  },
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <FiHash />
        </span>
        <span>Total</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="flex items-center rounded-lg w-fit py-1 px-3">
          {formatter.format(row.original.total)}
        </div>
      );
    },
    accessor: "total",
  },
  createdColumn,
  updatedColumn,
];

const salesColumn = [
  idColumn,
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <BiGitBranch />
        </span>
        <span>Kasir</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="flex items-center rounded-lg w-fit py-1">
          {row.original.user.name}
        </div>
      );
    },
    accessor: "user.name",
  },
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <BiGitBranch />
        </span>
        <span>Customer</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="flex items-center bg-[#d7dde4] rounded-lg w-fit py-1 px-3">
          {row.original.customer ? row.original.customer.name : "-"}
        </div>
      );
    },
    accessor: "customer.name",
  },
  {
    Header: (
      <div className="flex items-center">
        <span className="mr-2 text-base">
          <FiHash />
        </span>
        <span>Total</span>
      </div>
    ),
    Cell: ({ row }: any) => {
      return (
        <div className="flex items-center rounded-lg w-fit py-1">
          {formatter.format(row.original.total)}
        </div>
      );
    },
    accessor: "total",
  },
  createdColumn,
  updatedColumn,
];

export {
  categoriesColumn,
  productsColumn,
  suppliersColumn,
  customersColumn,
  rolesColumn,
  usersColumn,
  purchasesColumn,
  salesColumn,
};
