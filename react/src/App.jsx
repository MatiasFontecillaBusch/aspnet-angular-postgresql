import { Route, Routes } from "react-router";
import "./App.css";
import LoginView from "./views/LoginView";
import ProductsView from "./views/ProductsView";
import ProtectedRoute from "./components/guards/ProtectedRoute";

function App() {
  return (
    <div className="app-container">
      {/* Defined routes mapping paths to specific components */}
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/products" element={<ProductsView />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
