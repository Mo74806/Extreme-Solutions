import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import SearchBarFloat from "../components/SearchBarFloat";
import { Skeleton } from "../components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import EmptyState from "../components/EmptyState";

const Favorites = () => {
  //--------------------DECLERATIONS------------------------

  const { favorites } = useSelector(
    (state: RootState) => state.favorites ?? []
  );
  const searchBarRef = useRef<HTMLInputElement | null>(null); // Reference to search bar input
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLaoding] = useState(true);
  //------------------------FUNCTIONS---------------------------------------

  // Scroll and focus the search bar
  const handleFocusSearchBar = () => {
    if (searchBarRef.current) {
      // Scroll smoothly to the search bar
      searchBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Wait for scrolling to complete before focusing
      setTimeout(() => {
        searchBarRef.current?.focus();
      }, 500); // Adjust delay for smoother effect
    }
  };

  //--------------------UseEFFECTS----------------------------

  useEffect(() => {
    setLaoding(false);
    setSearchResult(favorites);
  }, [favorites]);

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
    if (searchValue) {
      let res = favorites.filter((user) => {
        if (user.login.includes(searchValue.trim())) return user;
      });
      setSearchResult(res);
    } else setSearchResult(favorites);
    setLaoding(false);
  };
  return (
    <div>
      <div className="relative h-full ">
        {/* Floating Search Bar (Appears on Scroll) */}
        <div
          className={`fixed !z-[100000]  bottom-5 right-5 transition-all duration-700 cursor-pointer`}
          onClick={handleFocusSearchBar} // Click to focus on SearchBar
        >
          <SearchBarFloat />
        </div>

        {/* Main Content */}
        <div className="w-full mt-[100px] flex flex-col items-center justify-center">
          <Navbar />

          {/* Search Bar with Ref */}
          <div className="w-full justify-center flex">
            <SearchBar
              ref={searchBarRef}
              handleSearch={handleSearch}
              setLoading={setLaoding}
            />
          </div>

          {/* User Cards Grid */}
          <div className="grid lg:grid-cols-2 mt-5 gap-5">
            {loading
              ? Array(6)
                  .fill("")
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-80 h-[200px] rounded-[10px]"
                    />
                  ))
              : searchResult.map((user, index) => (
                  <UserCard key={`${user.id}+${index}`} user={user} />
                ))}
          </div>
          {searchResult.length === 0 && (
            <EmptyState
              title={
                searchText
                  ? "There is No Matched Result"
                  : "There are No Favorites Users Added"
              }
              subTitle={
                searchText
                  ? "try search for another user"
                  : "try add users to favorits first"
              }
              button={true}
              buttonText="Go Home"
              buttonHandler={() => {}}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
