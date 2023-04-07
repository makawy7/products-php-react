import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <main className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto mt-6 mt-20 space-y-6">{children}</div>
    </main>
  );
}

export default Layout;
