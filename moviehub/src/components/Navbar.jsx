import { Link, NavLink } from "react-router-dom";
import {
  Clapperboard,
  Search,
  Bookmark,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar({ watchlistCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "TV Shows", path: "/tv-shows" },
    { name: "My Watchlist", path: "/watchlist" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080b14]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-violet-600 p-2">
            <Clapperboard size={23} />
          </div>
          <span className="text-2xl font-black tracking-tight">
            Movie<span className="text-violet-500">Hub</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-violet-400"
                    : "text-slate-400 hover:text-white"
                }`
              }
            >
              {link.name}
              {link.path === "/watchlist" && watchlistCount > 0 && (
                <span className="ml-1 rounded-full bg-violet-600 px-2 py-0.5 text-xs text-white">
                  {watchlistCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/movies"
            className="rounded-full border border-white/10 p-2 text-slate-300 hover:bg-white/10"
          >
            <Search size={19} />
          </Link>

          <Link
            to="/watchlist"
            className="relative hidden rounded-full border border-white/10 p-2 text-slate-300 hover:bg-white/10 sm:block"
          >
            <Bookmark size={19} />
            {watchlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px]">
                {watchlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 p-2 md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0d1220] px-5 py-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-violet-400"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}