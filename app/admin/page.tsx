import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* That's it - just empty space or add minimal content */}
      <div className="text-center text-tertiary">
        <p>Admin dashboard content goes here.</p>
      </div>
    </div>
  );
}