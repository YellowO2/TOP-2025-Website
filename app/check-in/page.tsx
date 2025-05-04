"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckInPage() {
  const searchParams = useSearchParams();
  const room = searchParams.get("room");

  const districts = Array.from({ length: 13 }, (_, i) => `District ${i + 1}`);
  const subOGs = Array.from({ length: 4 }, (_, i) => `SubOG ${i + 1}`);

  const [district, setDistrict] = useState("");
  const [subOG, setSubOG] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ district, subOG, room }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Check-in successful!");
      } else {
        setMessage(data.error || "Check-in failed.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {message ? (
        <p className="text-2xl text-center">{message}</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Check-In for Room {room}</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="p-2 border border-gray-300 rounded text-gray-700"
              required
            >
              <option value="" disabled>
                Select District
              </option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              value={subOG}
              onChange={(e) => setSubOG(e.target.value)}
              className="p-2 border border-gray-300 rounded text-gray-700"
              required
            >
              <option value="" disabled>
                Select SubOG
              </option>
              {subOGs.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? "Checking in..." : "Check In"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
