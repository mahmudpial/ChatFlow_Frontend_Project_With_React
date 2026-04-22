import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Inbox from "./pages/Inbox";
import Reminders from "./pages/Reminders";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default redirect to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* SaaS Core Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/inbox/:id" element={<Inbox />} />
        <Route path="/reminders" element={<Reminders />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;