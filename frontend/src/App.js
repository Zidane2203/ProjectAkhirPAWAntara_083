import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import CreateGuide from "./pages/CreateGuide";
import EditGuide from "./pages/EditGuide";
import Characters from "./pages/Characters";
import About from './pages/About';
import ProtectedLayout from "./layouts/ProtectedLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected (background + navbar dibungkus di ProtectedLayout) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guides" element={<Guide />} />
          <Route path="/guides" element={<Guide />} />
          <Route path="/guides/create" element={<CreateGuide />} />
          <Route path="/guides/edit/:id" element={<EditGuide />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
