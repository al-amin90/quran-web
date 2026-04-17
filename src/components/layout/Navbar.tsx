/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSettings } from "@/src/hooks/useSettings";

type FilterType = "all" | "surah" | "translation" | "arabic";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<"relevance" | "surah">("relevance");
  const { settings } = useSettings();

  const search = useCallback(
    async (q: string) => {
      if (q.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      const res = await fetch(
        `/api/search?q=${encodeURIComponent(q)}&filter=${filter}`,
      );
      const data = await res.json();
      let filteredResults = data.data ?? [];

      // Apply sorting
      if (sortBy === "surah") {
        filteredResults.sort((a: any, b: any) => a.surahId - b.surahId);
      }

      setResults(filteredResults);
      setLoading(false);
    },
    [filter],
  );

  useEffect(() => {
    const timer = setTimeout(() => search(query), 400); // debounce
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Search Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          {/* Search Input */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">
              Search Quran
            </h1>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in translations and Arabic text..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 text-base outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-white"
              autoFocus
            />
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {(
                [
                  { value: "all" as FilterType, label: "All" },
                  { value: "surah" as FilterType, label: "By Surah" },
                  { value: "translation" as FilterType, label: "Translation" },
                  { value: "arabic" as FilterType, label: "Arabic Text" },
                ] as const
              ).map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === f.value
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="sm:ml-auto">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "relevance" | "surah")
                }
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 bg-white cursor-pointer"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="surah">Sort: Surah Order</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          {query.length >= 2 && !loading && (
            <p className="text-xs text-gray-500 mt-3">
              Found{" "}
              <span className="font-semibold text-gray-700">
                {resultCount} result{resultCount !== 1 ? "s" : ""}
              </span>
            </p>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
            <p className="text-gray-400 mt-4">Searching...</p>
          </div>
        )}

        {!loading && query.length >= 2 && resultCount === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">
              No results found for "{query}"
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Try different keywords or adjust your filters
            </p>
          </div>
        )}

        {query.length < 2 && !loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📖</div>
            <p className="text-gray-400 text-lg">
              Start typing to search the Quran
            </p>
          </div>
        )}

        {/* Results Grid */}
        <div className="flex flex-col gap-4">
          {filteredResults.map((r, i) => (
            <Link
              key={i}
              href={`/surah/${r.surahId}#ayat-${r.verse.id}`}
              className="group block p-5 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all bg-white hover:bg-emerald-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-emerald-500 group-hover:bg-emerald-600 transition-colors">
                    Surah {r.surahId}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                    {r.surahTransliteration}
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  Verse {r.verse.id}
                </span>
              </div>

              {/* Arabic Text */}
              <p
                className="text-right mb-3 leading-loose p-3 bg-gray-50 rounded-lg group-hover:bg-emerald-100/50 transition-colors"
                style={{
                  fontFamily: settings.arabicFont + ", serif",
                  fontSize: settings.arabicFontSize * 0.75 + "px",
                }}
              >
                {r.verse.text}
              </p>

              {/* Translation */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {r.verse.translation}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Navbar;
