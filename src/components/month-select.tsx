import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

interface MonthSelectProps {
  month: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
}

const months = [
  { id: 1, name: "Januari" },
  { id: 2, name: "Februari" },
  { id: 3, name: "Maret" },
  { id: 4, name: "April" },
  { id: 5, name: "Mei" },
  { id: 6, name: "Juni" },
  { id: 7, name: "Juli" },
  { id: 8, name: "Agustus" },
  { id: 9, name: "September" },
  { id: 10, name: "Oktober" },
  { id: 11, name: "November" },
  { id: 12, name: "Desember" },
];

export function MonthSelect({ month, onChange }: MonthSelectProps) {
  const handleSelect = (selectedOption: any) => {
    onChange(parseInt(selectedOption));
  };

  return (
    <div className="min-w-[8rem] max-w-[10rem]">
      <Select
        onValueChange={handleSelect}
        defaultValue={months.find((x) => x.id === month)?.id.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pilih bulan">
            {months.find((x) => x.id === month)?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="text-lg">
          <SelectGroup>
            <SelectLabel>Bulan</SelectLabel>
            {months.map((customMonth) => (
              <SelectItem
                key={customMonth.id}
                value={customMonth.id.toString()}
              >
                {customMonth.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
