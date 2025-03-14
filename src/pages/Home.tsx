import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useInView } from "react-intersection-observer";
import { getUsers } from "../servcies/user.servcies";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import SearchBarFloat from "../components/SearchBarFloat";
import { Skeleton } from "../components/ui/skeleton";
import { toast } from "react-toastify";
import EmptyState from "../components/EmptyState";
import { UserInterface } from "../store/favoriteSlice";

const Home = () => {
  //--------------------DECLERATIONS------------------------
  const searchBarRef = useRef<HTMLInputElement | null>(null);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { ref, inView } = useInView(); // Detect bottom of the page
  const [firstLoad, setFirstLoad] = useState(true); //detect first render of the page to not make the request many times
  //------------------------FUNCTIONS---------------------------------------
  const getUsersList = async () => {
    // if (loading) return;
    setLoading(true);
    try {
      const response = await getUsers(
        page,
        decodeURIComponent(searchText)
          .replace(/[^a-zA-Z0-9\s]/g, "")
          ?.trim()
      );

      if (response.response) {
        toast(response.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          type: "error",
          className:
            "!bg-white dark:!bg-black dark:!text-white lg:w-full !text-black font-semibold ",
        });
        return new Error(response.response.data.message);
      }

      setUsers((prevUsers) =>
        page === 1 ? [...response] : [...prevUsers, ...response]
      );
    } catch (e) {
      toast("Failed to fetch users", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        type: "error",
        className:
          "!bg-white dark:!bg-black dark:!text-white lg:w-full !text-black font-semibold ",
      });
    } finally {
      setLoading(false);
      setFirstLoad(false);
    }
  };
  //--------------------UseEFFECTS----------------------------
  // Initial Load
  useEffect(() => {
    getUsersList();
  }, [page]);

  // Handle search input change
  useEffect(() => {
    if (!firstLoad) page == 1 ? getUsersList() : setPage(1);
  }, [searchText]);

  // Fetch more users when reaching the bottom
  useEffect(() => {
    if (!firstLoad && users && users.length > 0)
      if (inView && !loading) setPage((prevPage) => prevPage + 1);
  }, [inView]);

  // Automatically load more users if there's no scroll
  useEffect(() => {
    const checkScrollable = () => {
      if (
        document.documentElement.scrollHeight <= window.innerHeight &&
        !firstLoad
      )
        setPage((prevPage) => prevPage + 1);
    };

    checkScrollable();
  }, [users]); // Runs after users are updated
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
    <div className="relative h-full">
      {/* Floating Search Bar (Appears on Scroll) */}
      <div
        className={`fixed !z-[100000]  bottom-5 right-5 transition-all duration-700 cursor-pointer`}
        onClick={handleFocusSearchBar} // Click to focus on SearchBar
      >
        <SearchBarFloat />
      </div>

      {/* Main Content */}
      <div className="w-full mt-[89px] flex flex-col items-center justify-center">
        <Navbar />

        {/* Search Bar */}
        <div className="w-full justify-center flex mt-3">
          <SearchBar
            ref={searchBarRef}
            setLoading={setLoading}
            handleSearch={(searchValue: string) => setSearchText(searchValue)}
          />
        </div>

        {/* User Cards Grid */}
        <div className="grid lg:grid-cols-2 mt-5 gap-5">
          {users.map((user, index) => (
            <UserCard key={`${user.id}+${index}`} user={user} />
          ))}

          {/* Skeleton Loader when fetching more users */}
          {loading &&
            Array(6)
              .fill("")
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-80 h-[200px] rounded-[10px]"
                />
              ))}
        </div>

        {!loading && users.length === 0 && (
          <EmptyState
            title={
              searchText ? "There is No Matched Result" : "There are No  Users "
            }
            subTitle={
              searchText ? "try search for another user" : "try again later"
            }
            button={true}
            buttonText="Try Again"
            buttonHandler={() => {}}
          />
        )}

        {/* Sentinel div to detect when the user hits the bottom */}
        <div ref={ref} className="h-10 w-full"></div>
      </div>
    </div>
  );
};

export default Home;
