import { Input } from "@/components/ui/input";

interface CategoryFilterProps {
  placeHolder: string;
}

export function CategoryFilter({ placeHolder, ...props }: CategoryFilterProps) {
  <Input placeholder={placeHolder} className="max-w-sm" {...props} />;
}
