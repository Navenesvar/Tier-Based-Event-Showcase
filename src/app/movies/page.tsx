'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const tierRank = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
} as const;

const tierColors = {
  free: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800',
  silver: 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900',
  gold: 'bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800',
  platinum: 'bg-gradient-to-r from-purple-300 to-purple-500 text-purple-800',
};

export type Movie = {
  id: string;
  title: string;
  description: string;
  release_date: string;
  image_url: string;
  tier: keyof typeof tierRank;
};

export default function MoviesPage() {
  const { user } = useUser();
  const [movies, setMovies] = useState<(Movie & { isLocked?: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userTier: keyof typeof tierRank =
    (user?.publicMetadata?.tier as keyof typeof tierRank) || 'free';

    useEffect(() => {
    if (!user) return;

    const userTier: keyof typeof tierRank = (user?.publicMetadata?.tier as keyof typeof tierRank) || 'free';

    const fetchMovies = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("movies").select("*");
      if (error) {
        console.error("Supabase error:", error);
        setMovies([]);
      } else {
        const filtered = (data as Movie[]).map((movie) => ({
          ...movie,
          isLocked: tierRank[movie.tier] > tierRank[userTier],
        }));
        setMovies(filtered);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Welcome, {user?.firstName || 'Guest'} <span className="ml-2">🍿</span>
        </h1>
        {userTier !== 'platinum' && (
          <button
            onClick={() => router.push('/tier')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700"
          >
            Upgrade Tier
          </button>
        )}
      </div>

      <div className="text-center text-lg text-gray-300 mb-10">
        You are a <strong className="text-white">{userTier.toUpperCase()}</strong> user
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => {
            const isLocked = tierRank[movie.tier] > tierRank[userTier];
            return (
              <div
                key={movie.id}
                className={`relative rounded-xl overflow-hidden shadow-lg bg-zinc-900 text-white border border-zinc-700 transition-transform hover:scale-[1.02] ${
                  isLocked ? "opacity-60 blur-[0.5px]" : ""
                }`}
              >
                <img
                  src={movie.image_url || "https://via.placeholder.com/400x250"}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-zinc-300 mb-3">{movie.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-zinc-400">
                      📅 {new Date(movie.release_date).toLocaleDateString()}
                    </p>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${tierColors[movie.tier]}`}
                    >
                      {movie.tier.toUpperCase()}
                    </span>
                  </div>
                </div>

                {isLocked && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-sm font-semibold">
                      🔒 Upgrade to <span className="uppercase">{movie.tier}</span> to watch this
                    </p>
                    <button
                      onClick={() => router.push('/tier')}
                      className="mt-2 text-sm px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded"
                    >
                      Upgrade Now
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <RecommendBox userTier={userTier} />
    </div>
  );
}

function RecommendBox({ userTier }: { userTier: string }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true);
    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tier: userTier,
        liked: [query || "Inception"],
      }),
    });
    const data = await res.json();
    setResponse(data.suggestions);
    setLoading(false);
  };

  return (
    <div className="mt-20 p-6 border border-zinc-700 rounded-xl bg-zinc-900 shadow-xl text-white">
      <h2 className="text-2xl font-extrabold mb-4 flex items-center">
        <Sparkles className="mr-2 text-pink-400" /> AI Movie Recommender
      </h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="What kind of movies do you like?"
        className="w-full mb-4 px-4 py-2 border rounded bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
      />
      <button
        onClick={handleRecommend}
        disabled={loading}
        className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700"
      >
        {loading ? "Thinking..." : "Suggest a Movie for Me"}
      </button>

      {response && (
        <div className="mt-4 text-sm whitespace-pre-wrap bg-zinc-800 p-4 rounded shadow-inner">
          {response}
        </div>
      )}
    </div>
  );
}
