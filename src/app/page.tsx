import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-black text-white">
      <h1 className="text-5xl font-bold mb-4 text-center">🎬 Tier-Based Movie Library</h1>
      <p className="text-xl text-gray-300 text-center mb-6">Watch only the movies you&apos;re allowed to access.</p>

      <SignedOut>
        <SignInButton>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-full text-lg shadow-md hover:bg-indigo-700">
            Sign In to Browse Movies
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <Link
            href="/movies"
            className="px-6 py-3 bg-green-600 text-white rounded-full text-lg shadow-md hover:bg-green-700"
          >
            Go to Movies Page
          </Link>
        </div>
      </SignedIn>
    </main>
  );
}
