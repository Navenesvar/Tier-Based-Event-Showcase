"use client";

import { useState } from "react";

export default function RecommendPage() {
  const [movies, setMovies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function getRecommendations() {
    setLoading(true);
    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre: "sci-fi" }),
      });

      const data = await res.json();
      setMovies(data.recommendations || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie Recommendations</h1>

      <button
        onClick={getRecommendations}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      <ul className="mt-4 list-disc pl-6">
        {movies.map((movie, idx) => (
          <li key={idx}>{movie}</li>
        ))}
      </ul>
    </div>
  );
}
