import "./App.css";
import Fashiontrends from "./components/fashiontrends";
import Landingpage from "./components/landingpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/trends/:gender" element={<Fashiontrends />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
