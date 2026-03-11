import { BrowserRouter, Routes, Route } from "react-router-dom";
import KioskForm from "../pages/KioskForm";

function Approuter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KioskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Approuter;