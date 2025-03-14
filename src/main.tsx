import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./context/ThemeContextType.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { ToastContainer } from "react-toastify";
import LoadingPage from "./components/LoadingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    {/* device mode */}
    <Provider store={store}>
      {/* Redux store */}
      <ErrorBoundary>
        {/* Error boundary for catching any unhandeled errors */}
        <PersistGate loading={<LoadingPage />} persistor={persistor}>
          {/* delay render of app untill the persisted state is rehydrated*/}
          <App />
          {/* Toaster for displaying message like [confirmation ,errors] */}
          <ToastContainer
            style={{ maxWidth: "300px" }}
            className={
              "w-[200px] lg:w-full flex  px-0  justify-self-end  mx-0   !mt-[90px]"
            }
          />
        </PersistGate>
      </ErrorBoundary>
    </Provider>
  </ThemeProvider>
);
