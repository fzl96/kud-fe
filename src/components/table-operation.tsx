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

export function TableOperation({ link }: TableOperationProps) {
  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link to={link}>
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
    </>
  );
}
