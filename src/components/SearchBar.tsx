import { Search } from "lucide-react";
import { useState, forwardRef } from "react";

const SearchBar = forwardRef<HTMLInputElement, {}>((_, ref) => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative bg-white card-shadow backdrop-blur-lg rounded-2xl p-4 w-[50%] text-black text-center transition-all">
      {/* Search Input */}
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-[#b71824] transition-all">
        <Search className="text-gray-500 transition-all" />
        <input
          ref={ref}
          type="text"
          placeholder="Search user..."
          className="w-full bg-transparent outline-none text-black placeholder-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
});

export default SearchBar;
