import { ArrowRight, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addFavorite, removeFavorite } from "../store/favoriteSlice";
// import { addFavorite, removeFavorite } from "../store/favoriteSlice";

const UserCard = ({ user }: { user: any }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(
    (state: RootState) => state.favorites ?? []
  );
  const [isFavorite, setIsFavorite] = useState(false);

  // Sync state with Redux
  useEffect(() => {
    console.log(favorites);
    const found = favorites.some((fav: any) => fav.id === user.id);
    setIsFavorite(found);
  }, [favorites, user.id]);
  const handleToggleFavorite = () => {
    if (isFavorite) dispatch(removeFavorite(user.id));
    else dispatch(addFavorite(user));
  };

  return (
    <div className="relative bg-white card-shadow backdrop-blur-lg rounded-2xl p-6 w-80 text-white text-center transition-all">
      <div className="flex gap-x-2">
        {/* Favorite Toggle */}
        <Bookmark
          onClick={handleToggleFavorite}
          className="absolute right-5 cursor-pointer"
          fill={isFavorite ? "red" : "none"}
          color="red"
        />

        {/* Avatar */}
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 rounded-[8px] border-2 border-[#b71824] shadow-lg"
        />

        {/* Username */}
        <h5 className="text-[18px] font-semibold text-black">{user.login}</h5>
      </div>

      {/* Profile Link */}
      <div className="absolute bottom-0 right-0">
        <div
          className="flex cursor-pointer justify-end items-center text-[#454F5B] px-4 py-2 rounded-lg font-medium 
             hover:bg-white hover:text-[#b71824] transition-all"
        >
          View Profile
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
