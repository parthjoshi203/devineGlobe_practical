import { Suspense } from "react";
import { Provider } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import LoadingFallback from "./components/common/loadingFallback";
import Privateroute from "./components/common/Privateroute";
import PublicRoute from "./components/common/PublicRoute";
import ListPage from "./pages/ListPage";
import Login from "./pages/Login";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                element={
                  <Privateroute>
                    <ListPage />
                  </Privateroute>
                }
                path="/"
              />
              <Route element={<Navigate to="/login" />} path="*" />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
