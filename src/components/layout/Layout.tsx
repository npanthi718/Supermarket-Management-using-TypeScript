import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
};