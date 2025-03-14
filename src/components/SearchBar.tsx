import { Search } from "lucide-react";
import {
  useState,
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  memo,
} from "react";
import { useDebounce } from "use-debounce";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleSearch: Function; // Function prop to handle search
  setLoading: Function;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ handleSearch, setLoading, placeholder }, ref) => {
    const [query, setQuery] = useState<string>("");
    const [debouncedValue] = useDebounce(query, 1000);
    useImperativeHandle(ref, () => searchInputRef.current!);

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key.toLowerCase() === "k") {
          event.preventDefault(); // Prevent browser's default search behavior

          // Delay execution slightly to ensure smooth scrolling across pages
          setTimeout(() => {
            if (searchInputRef.current) {
              searchInputRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              requestAnimationFrame(() => {
                searchInputRef.current?.focus();
              });
            }
          }, 0);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    useEffect(() => {
      handleSearch(debouncedValue);
    }, [debouncedValue]);

    useEffect(() => {
      setLoading(true);
    }, [query]);
    return (
      <div className="relative  dark:bg-black/30 dark:backdrop-blur-xl dark:shadow-lg dark:border dark:border-white/20 bg-white card-shadow backdrop-blur-lg border border-transparent rounded-2xl p-4 w-[90%] lg:w-[50%] text-black text-center transition-all">
        {/* Search Input */}
        <div className="flex  items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-[#b71824] transition-all">
          <Search className="text-gray-500 transition-all" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder={placeholder || "Search ....."}
            className="w-full  bg-transparent outline-none text-black dark:text-white placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {!query && (
          <div className="absolute right-6 top-6">
            <span className="text-gray-600 dark:text-white  text-[10px] font-extrabold">
              CTRL + K
            </span>
          </div>
        )}
      </div>
    );
  }
);

export default memo(SearchBar);
