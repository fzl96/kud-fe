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

export function PurchaseTableOperation({ id }: TableOperationProps) {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Link to={`/pembelian/${id}`}>
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#e1f8ea] hover:bg-green-200 text-green-600"
              >
                <Icons.zoomIn className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Lihat Data</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Link to={`/pembelian/edit/${id}`}>
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#e7f0ff] hover:bg-blue-200 text-[#4182eb]"
              >
                <Icons.edit className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Edit data</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
