import { ArrowRight, Bookmark } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";
import { toast } from "react-toastify";

const UserCard = ({ user }: { user: any }) => {
  console.log(user);
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: any) => state.favorites ?? []);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(user.id));
      toast(`User [ ${user.login} ] Removed From Favorites Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        type: "success",

        className: "!bg-white !text-black font-semibold ",
      });
    } else {
      dispatch(addFavorite(user));
      toast(`User [ ${user.login} ] Added to Favorites Successfully`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        type: "success",

        className: "!bg-white !text-black font-semibold ",
      });
    }
  };

  // Sync state with Redux
  useEffect(() => {
    const found = favorites.some((fav: any) => fav.id === user.id);
    setIsFavorite(found);
  }, [favorites, user.id]);

  return (
    <div className="relative bg-white/60  hover:bg-white dark:bg-black/30 hover:dark:bg-black  backdrop-blur-xl dark:shadow-lg dark:border dark:border-white/20 rounded-2xl p-6 w-80 text-black dark:text-white text-center transition-all duration-300">
      <div className="flex gap-x-2  overflow-hidden w-[90%]">
        {/* Favorite Toggle Button */}
        <Bookmark
          onClick={handleToggleFavorite}
          className="absolute right-5 cursor-pointer"
          fill={isFavorite ? "red" : "none"}
          color="red"
        />

        {/* User Image */}
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 rounded-[8px] border-2 border-[#b71824] shadow-md object-cover"
          width={96}
          height={96}
          loading="lazy"
        />

        {/* Username */}
        <h5 className="text-[18px] font-semibold text-start text-nowrap  text-black dark:text-gray-200">
          {user.login}
        </h5>
      </div>

      {/* Profile Link */}
      <div className="absolute bottom-2 right-2">
        <a
          href={user.html_url}
          target="_blank"
          className="flex cursor-pointer justify-end items-center text-gray-600 dark:text-gray-400 px-4 py-2 rounded-lg font-medium 
            hover:text-[#b71824] duration-300 transition-all"
        >
          View Profile
          <ArrowRight />
        </a>
      </div>
    </div>
  );
};

export default memo(UserCard);
