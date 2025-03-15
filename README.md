# 📌 Extreme Solutions

A React application with theme persistence, error handling, user fetching, and Redux-based state management.

# 🚀 Features

✅ **GitHub Users Fetching**: Retrieves **paginated** user data from the **GitHub API**.  
 ✅**Theme Management**: Supports **dark** and **light** modes with **local storage** persistence.  
✅ **Error Boundary**: Catches errors in the React component tree and displays a fallback UI.  
✅ **Redux Persist**: Stores **favorite users** persistently using **Redux Toolkit** and **redux-persist**.

## 📦 Installation

**📥 Clone the Repository**

git clone git@github.com:Mo74806/Extreme-Solutions.git

cd project-name

**📥 Install dependencies:**

npm install

**📥 Start the development server:**

npm run dev

## ⚠️ Issue: GitHub API Pagination Bug & Search

**🚨 GitHub API pagination does not work as expected.**
Although the API correctly returns the number of users per page as defined, changing pages always returns the first set of users instead of fetching new ones.
This issue seems to be related to GitHub’s caching mechanism or a missing parameter in the API request.
**🚨 GitHub API search isn't the same as the provided one.**
it use anothe api and it has a low rate limit so it block the IP for a little bit sometimes

## 📂 Project Structure

![App Screenshot](https://cloud.appwrite.io/v1/storage/buckets/679abad300010468c034/files/67d4963600357775ea65/view?project=66981a12002644c13be7&mode=admin)

## Usage

**1. Theme Management**

**Provider**: The <ThemeProvider> wraps the app and manages the theme state.

**Hook**: useTheme() returns the current theme and a toggleTheme() function.

import { useTheme } from "../context/ThemeContext";

const ThemeSwitcher = () => {
const { theme, toggleTheme } = useTheme();
return <button onClick={toggleTheme}>Switch to {theme === "dark" ? "light" : "dark"} mode</button>;
};

**2. Error Handling**

Wrap your app with <ErrorBoundary>:

<ErrorBoundary>
  <App />
</ErrorBoundary>

**3. Fetching GitHub Users**

import { getUsers } from "../services/users.services.ts";

useEffect(() => {
getUsers(1, "john").then(data => console.log(data));
}, []);

**4. Managing Favorites (Redux Toolkit + Persist)**

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoriteSlice";

const dispatch = useDispatch();
const favorites = useSelector((state) => state.favorites.favorites);

dispatch(addFavorite({ id: 1, login: "JohnDoe",......... }));
dispatch(removeFavorite(1));

**Dependencies**

React: Frontend framework

Redux Toolkit: State management

redux-persist: Persist Redux state

Axios: API requests

Tailwind CSS: Styling

TypeScript: Type safety

License

MIT License
