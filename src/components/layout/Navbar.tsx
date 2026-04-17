/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSettings } from "@/src/providers/SettingsProvider";
import SettingsSidebar from "./SettingsSidebar";

type FilterType = "all" | "surah" | "translation" | "arabic";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<"relevance" | "surah">("relevance");
  const [showDropdown, setShowDropdown] = useState(false);
  const { settings } = useSettings();

  const search = useCallback(
    async (q: string) => {
      if (q.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const filteredResults = data.data ?? [];

      if (sortBy === "surah") {
        filteredResults.sort((a: any, b: any) => a.surahId - b.surahId);
      }

      setResults(filteredResults);
      setLoading(false);
    },
    [filter],
  );

  useEffect(() => {
    const timer = setTimeout(() => search(query), 400);
    return () => clearTimeout(timer);
  }, [query, search, sortBy]);

  const getFilteredResults = () => {
    if (filter === "all") return results;

    return results.filter((r) => {
      switch (filter) {
        case "surah":
          return true;
        case "translation":
          return r.verse.translation
            .toLowerCase()
            .includes(query.toLowerCase());
        case "arabic":
          return r.verse.text.includes(query);
        default:
          return true;
      }
    });
  };

  const filteredResults = getFilteredResults();
  const resultCount = filteredResults.length;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        {/* Main Navbar Row */}
        <div className="flex items-center gap-3">
          {/* Logo/Title */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">📖</span>
            </div>
          </Link>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search Quran..."
              className="w-full px-3 py-2 rounded-lg border-2 border-emerald-200 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-white"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>

          <SettingsSidebar />
        </div>

        {/* Dropdown Results - Only show when searching */}
        {showDropdown && query.length >= 2 && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white border-2 border-emerald-200 rounded-xl shadow-xl z-40 max-h-96 overflow-y-auto">
            {loading && (
              <div className="p-4 text-center text-sm text-gray-500">
                Searching...
              </div>
            )}

            {!loading && resultCount === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                No results for - {query}
              </div>
            )}

            {!loading && resultCount > 0 && (
              <div>
                {/* Results Summary */}
                <div className="px-4 py-2 border-b border-emerald-100 bg-emerald-50">
                  <p className="text-xs font-semibold text-emerald-700">
                    Found {resultCount} result{resultCount !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Results List */}
                <div className="divide-y divide-emerald-100">
                  {filteredResults.map((r, i) => (
                    <Link
                      key={i}
                      href={`/surah/${r.surahId}#ayat-${r.verse.id}`}
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-3 hover:bg-emerald-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-600">
                          Surah {r.surahId} • Verse {r.verse.id}
                        </span>
                      </div>
                      <p
                        className="text-right text-xs leading-relaxed text-emerald-900 mb-1"
                        style={{
                          fontFamily: settings.arabicFont + ", serif",
                          fontSize: settings.arabicFontSize * 0.6 + "px",
                        }}
                      >
                        {r.verse.text.substring(0, 80)}...
                      </p>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {r.verse.translation.substring(0, 100)}...
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
