import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

interface UserAvatarProps extends AvatarProps {
  user: {
    name: string | null;
    image: string | null;
  };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {/* {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : ( */}
      <AvatarFallback className="">
        <span className="sr-only">{user.name}</span>
        <Icons.user className="h-5 w-5 " strokeWidth={3} />
      </AvatarFallback>
      {/* )} */}
    </Avatar>
  );
}
