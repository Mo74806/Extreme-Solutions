import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
export interface UserInterface {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: "User" | "Organization";
  url: string;
  user_view_type: "public" | "private";
}
interface FavoriteState {
  favorites: UserInterface[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<any>) => {
      if (!state.favorites.includes(action.payload))
        state.favorites.push(action.payload);
    },

    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload
      );
    },
  },
});

const persistConfig = {
  key: "favorites",
  storage,
};

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default persistReducer(persistConfig, favoriteSlice.reducer);
