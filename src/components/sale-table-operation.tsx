import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CreditPayment } from "./credit-payment";

interface TableOperationProps {
  link: string;
}

export function SaleTableOperation({ link }: TableOperationProps) {
  return (
    <div className="flex items-center gap-3">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link to={link}>
              <Button
                variant="secondary"
                className="bg-[#e1f8ea] hover:bg-green-200"
                size="sm"
              >
                <Icons.zoomIn className="h-4 w-4 text-green-600" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Lihat Detail Transaksi</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
