import React from "react";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/DropdownMenu";

function AppHeader() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <nav className="flex items-center gap-6">
        <a href="/polls" className="text-base font-medium text-gray-700 dark:text-gray-200 hover:underline">Polls</a>
        <a href="/polls/create" className="text-base font-medium text-gray-700 dark:text-gray-200 hover:underline">Create Poll</a>
      </nav>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden md:inline-flex" asChild>
          <a href="/polls/create">New Poll</a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="/placeholder-user.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <a href="/profile">Profile</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/settings">Settings</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/logout">Logout</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function AppFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-4 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 mt-8">
      &copy; {year} Polling App. All rights reserved.
    </footer>
  );
}

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}