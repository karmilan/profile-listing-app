import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import ProfileDetails from "./pages/ProfileDetails";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfileDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
