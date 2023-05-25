import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

interface YearSelectProps {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

export function YearSelect({ year, setYear }: YearSelectProps) {
  const years = [];
  for (let i = 0; i <= 10; i++) {
    const year = new Date().getFullYear() - i;
    years.push(year);
  }

  const handleSelect = (selectedOption: any) => {
    setYear(parseInt(selectedOption));
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Pilih Tahun">{year}</SelectValue>
      </SelectTrigger>
      <SelectContent className="text-lg">
        <SelectGroup>
          <SelectLabel>Tahun</SelectLabel>
          {years.map((customYear) => (
            <SelectItem key={customYear} value={customYear.toString()}>
              {customYear}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
