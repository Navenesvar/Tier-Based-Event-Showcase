'use client';

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

const tierRank = { free: 0, silver: 1, gold: 2, platinum: 3 } as const;

const upgradeTiers = [
  { name: "silver", price: 5 },
  { name: "gold", price: 10 },
  { name: "platinum", price: 20 },
] as const;

export default function TierSelectionPage() {
  const { user } = useUser();
  const router = useRouter();
  const [selected, setSelected] = useState<string>("");
  const [paying, setPaying] = useState(false);

  const handleUpgrade = async (tier: string) => {
    setSelected(tier);
    setPaying(true);
  };

  const handleFakePayment = async () => {
  await fetch("/api/update-tier", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tier: selected }),
  });

  await user?.reload(); // <-- Force re-fetching the updated tier from Clerk
  router.push("/movies");
};
  const currentTier = (user?.publicMetadata?.tier as keyof typeof tierRank) || "free";

  // Filter upgrade options based on user's current tier
  const displayTiers = upgradeTiers.filter(
    (t) =>
      tierRank[t.name as keyof typeof tierRank] >
      tierRank[currentTier as keyof typeof tierRank]
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Upgrade Your Tier 🎬</h1>

      {displayTiers.length === 0 ? (
        <p className="text-xl text-green-600 font-semibold">
          You are already a Platinum user 💎
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {displayTiers.map((tier) => (
              <div
                key={tier.name}
                onClick={() => handleUpgrade(tier.name)}
                className="border p-6 rounded-xl cursor-pointer shadow hover:shadow-md hover:scale-[1.02] transition"
              >
                <h2 className="text-xl font-semibold capitalize">{tier.name}</h2>
                <p className="text-gray-600 mt-2">${tier.price} one-time</p>
              </div>
            ))}
          </div>

          {paying && (
            <div className="mt-10 p-6 border rounded-xl bg-white shadow-md">
              <h2 className="text-xl font-bold mb-4">Dummy Payment</h2>
              <p className="mb-4">
                You're upgrading to <strong>{selected}</strong> tier. Click below to simulate payment.
              </p>
              <button
                onClick={handleFakePayment}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Pay & Access Movies
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
