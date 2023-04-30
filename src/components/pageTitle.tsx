import NewRecordBtn from "./newRecordBtn";

interface Props {
  title: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}

export default function PageTitle({ title, setOpen, loading }: Props) {
  return (
    <div className="flex justify-between mx-5 md:mx-10 items-center">
      <h1 className="text-xl">{title}</h1>
      <NewRecordBtn
        text={`Tambah ${title}`}
        setOpen={setOpen}
        loading={loading}
      />
    </div>
  );
}
