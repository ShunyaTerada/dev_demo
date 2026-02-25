import { User } from "../types/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserCard({ user }: { user: User }) {
  return (
    <div className="user-card">
      <div>
        <Avatar className="rounded-lg">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
      <div className="p-4 border rounded shadow">
        <p>{user.name}</p>
      </div>
    </div>
  );
}
