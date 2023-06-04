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

export function GroupsTableOperation({ id }: TableOperationProps) {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Link to={`/kelompok/${id}`}>
              <Button variant="secondary" size="sm">
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
            <Link to={`/kelompok/edit/${id}`}>
              <Button variant="secondary" size="sm">
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
