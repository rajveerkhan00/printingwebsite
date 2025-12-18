import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/app/components/ThemeToggle"; // Change to named import

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-page-primary">
      <header className="bg-page-secondary shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-primary">
              Admin Panel
            </h1>
            
            <div className="flex items-center space-x-4">
              <a 
                href="/"
                className="px-4 py-2 bg-accent text-white rounded text-sm hover:opacity-90"
              >
                Back to website
              </a>
              
              <ThemeToggle />
              
              <UserButton 
                afterSignOutUrl="/sign-in"
              />
            </div>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}