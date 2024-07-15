import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthContext";
import GoToTop from "./GoToTop";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              backgroundColor: "black",
              color: "white",
              borderWidth: "2px",
              borderColor: "white",
            },
          }}
        />
        <App />
        <GoToTop />
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
