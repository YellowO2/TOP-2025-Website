"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { GoChevronDown } from "react-icons/go";
import { BiKey } from "react-icons/bi";

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
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center px-12">
      {message ? (
        <p className="text-2xl text-center">{message}</p>
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-3 ">
          <BiKey className="flex" size={64} />
          <h2 className="flex font-homevideo font-bold">Check Into {room}</h2>
          <p className="flex w-full text-center text-pretty text-xs px-8 mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam eos debitis officia, cumque culpa.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-full md:w-2/5"
          >
            <div className="flex relative w-full">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="formSelect font-homevideo"
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
              <GoChevronDown className="absolute top-4 right-4" />
            </div>

            <select
              value={subOG}
              onChange={(e) => setSubOG(e.target.value)}
              className="formSelect font-homevideo"
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
              className="py-3 bg-white text-semibold text-black font-homevideo rounded-lg mt-4"
              disabled={loading}
            >
              {loading ? "Checking in..." : "Check In"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}