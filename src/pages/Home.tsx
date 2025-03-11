import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useInView } from "react-intersection-observer";
import { getUsers } from "../servcies/user.servcies";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import SearchBarFloat from "../components/SearchBarFloat";

const Home = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchBarRef = useRef<HTMLInputElement | null>(null); // Reference to search bar input
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]); // Store users in state
  // const { ref, inView } = useInView(); // Detect scroll position
  const [loading, setLaoding] = useState(true);

  const getUsersList = async () => {
    try {
      let response = await getUsers(page);
      setUsers((prevUsers) => [
        ...prevUsers,
        ...response,
        ...response,
        ...response,
      ]);
    } catch (e) {
      console.log(e);
      throw new Error("Failed to fetch users. Please try again later.");
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);
  useEffect(() => {
    const handleScroll = () => {
      setShowSearch(window.scrollY > 100); // Show SearchBarFloat after scrolling 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
  return (
    <div>
      <div className="relative h-full">
        {/* Floating Search Bar (Appears on Scroll) */}
        <div
          className={`fixed ${
            showSearch ? "opacity-100" : "opacity-0"
          } bottom-5 right-5 transition-all duration-700 cursor-pointer`}
          onClick={handleFocusSearchBar} // Click to focus on SearchBar
        >
          <SearchBarFloat />
        </div>

        {/* Main Content */}
        <div className="w-full mt-[100px] flex flex-col items-center justify-center dark:bg-yellow-400">
          <Navbar />

          {/* Search Bar with Ref */}
          <div className="w-full justify-center flex">
            <SearchBar ref={searchBarRef} />
          </div>

          {/* User Cards Grid */}
          <div className="grid grid-cols-2 mt-5 gap-5">
            {loading
              ? null
              : users.map((user, index) => (
                  <UserCard key={index} user={user} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
