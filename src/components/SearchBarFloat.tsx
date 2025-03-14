import { Search } from "lucide-react";
import { memo, useEffect, useState } from "react";
const SearchBarFloat = () => {
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowSearch(window.scrollY > 100); // Show SearchBarFloat after scrolling 100px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={` relative dark:bg-black/30 dark:backdrop-blur-xl dark:shadow-lg dark:border dark:border-white/20 bg-white card-shadow backdrop-blur-lg rounded-2xl p-4 w-auto    text-black text-center transition-all ${
        showSearch ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-2  rounded-lg px-2 py-2  transition-all">
        <Search className="text-gray-500 transition-all" />
      </div>
    </div>
  );
};

export default memo(SearchBarFloat);
