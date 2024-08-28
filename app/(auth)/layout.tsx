import React from "react";

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="relative flex items-center justify-center h-screen w-full">
      {children}
    </main>
  );
};

export default AuthLayout;
