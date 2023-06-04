import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface TableOperationProps {
  id: string;
}

export function GroupDetailsTableOperation({ id }: TableOperationProps) {
  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Link to={`/anggota/${id}`}>
              <Button
                variant="secondary"
                className="bg-[#e1f8ea] hover:bg-green-200 text-green-600 gap-2"
                size="sm"
              >
                <Icons.zoomIn className="h-4 w-4 " />
                Lihat Anggota
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Lihat Detail Anggota</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
