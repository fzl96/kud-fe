import {
  Card as CardComp,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardProps {
  title?: string;
  description?: string;
  footer?: string;
  titleClass?: string;
  children: React.ReactNode;
}

export function Card({
  title,
  titleClass,
  description,
  footer,
  children,
}: CardProps) {
  return (
    <CardComp>
      <CardHeader className="pb-3">
        <CardTitle className={cn(titleClass ?? "")}>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardComp>
  );
}
