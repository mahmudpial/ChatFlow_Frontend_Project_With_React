import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Inbox from "./pages/Inbox";
import Reminders from "./pages/Reminders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/inbox/:id" element={<Inbox />} />
        <Route path="/reminders" element={<Reminders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;