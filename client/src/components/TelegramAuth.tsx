import { useState } from "react";
import { Send, LogOut } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TelegramUser {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

export default function TelegramAuth() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  const handleLogin = () => {
    console.log("Telegram login initiated");
    setUser({
      id: "123456789",
      firstName: "User",
      lastName: "Demo",
      username: "demo_user",
      photoUrl: undefined,
    });
  };

  const handleLogout = () => {
    setUser(null);
    console.log("Logged out");
  };

  if (!user) {
    return (
      <Button
        onClick={handleLogin}
        className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white"
        data-testid="button-telegram-login"
      >
        <SiTelegram className="h-4 w-4 mr-2" />
        Login with Telegram
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 hover-elevate" data-testid="button-user-menu">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoUrl} />
            <AvatarFallback>
              {user.firstName[0]}{user.lastName?.[0] || ""}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">
            {user.firstName} {user.lastName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleLogout} data-testid="button-logout">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
