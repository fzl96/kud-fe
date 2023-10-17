interface PageTitleProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function PageTitle({ heading, text, children }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-bold text-xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  );
}
