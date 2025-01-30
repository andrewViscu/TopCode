import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProblemsPage from "./pages/ProblemsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/problems" element={<ProblemsPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;