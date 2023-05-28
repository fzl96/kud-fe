import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import { logout } from "@/lib/api/auth";
import { useNavigate } from "react-router-dom";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: {
    name: string | null;
    image: string | null;
    username: string | null;
  };
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <UserAvatar
            user={{ name: user.name || null, image: user.image || null }}
            className="h-8 w-8"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.username && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.username}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={async (event) => {
            event.preventDefault();
            try {
              await logout();
              navigate("/login");
              return;
            } catch (error) {}
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
