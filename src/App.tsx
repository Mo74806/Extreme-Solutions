import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/LoadingPage";

const LazyHome = lazy(() => import("./pages/Home"));
const LazyFavorites = lazy(() => import("./pages/Favorites"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/favorites" element={<LazyFavorites />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
