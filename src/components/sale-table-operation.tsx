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
  link: string;
}

export function SaleTableOperation({ link }: TableOperationProps) {
  return (
    <div className="flex items-center">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Link to={link}>
              <Button variant="secondary" size="sm">
                <Icons.zoomIn className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Lihat Data</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
