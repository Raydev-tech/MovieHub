import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">
      <Search
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies, TV shows..."
        className="w-full rounded-xl border border-white/10 bg-[#111827] py-4 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          aria-label="Clear search"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}