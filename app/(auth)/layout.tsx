import React from "react";

function AuthFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-4 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 mt-8">
      &copy; {year} Polling App. All rights reserved.
    </footer>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}