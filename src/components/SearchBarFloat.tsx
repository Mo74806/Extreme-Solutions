import { Search } from "lucide-react";
const SearchBarFloat = () => {
  return (
    <div className="relative bg-white card-shadow backdrop-blur-lg rounded-2xl p-4 w-auto    text-black text-center transition-all">
      <div className="flex items-center gap-2  rounded-lg px-2 py-2  transition-all">
        <Search className="text-gray-500 transition-all" />
      </div>
    </div>
  );
};

export default SearchBarFloat;
