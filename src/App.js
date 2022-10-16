import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import AddPages from "./pages/AddPages";
import DetailPages from "./pages/DetailPages";
import EditPages from "./pages/EditPages";
import Monitoring from "./pages/Monitoring";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Monitoring />} />
      <Route path="/add-data" element={<AddPages />} />
      <Route path="/edit-data/:noreg" element={<EditPages />} />
      <Route path="/detail-data/:noreg" element={<DetailPages />} />
    </Routes>
  );
}

export default App;
