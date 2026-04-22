import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;