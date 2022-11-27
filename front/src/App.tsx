import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.min.css";
import { ROUTES } from "./enum/routes";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import CeoLoginPage from "./ceo/pages/LoginPage";
import CeoRegisterPage from "./ceo/pages/RegisterPage";
import MainPage from "./ceo/pages/MainPage";
import ManagementPage from "./ceo/pages/ManagementPage";
import MenuPage from "./ceo/pages/MenuPage";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CEO.LOGIN} element={<CeoLoginPage />} />
        <Route path={ROUTES.CEO.REGISTER} element={<CeoRegisterPage />} />
        <Route path={ROUTES.CEO.MAIN} element={<MainPage />} />
        <Route path={ROUTES.CEO.MANAGEMENT} element={<ManagementPage />} />
        <Route path={ROUTES.CEO.MENU} element={<MenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;
