import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Inbox from "./pages/Inbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/inbox/:id" element={<Inbox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;