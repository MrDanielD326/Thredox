import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "@/pages/Home";
import About from "./pages/About";

function App() {
    const location = useLocation();
    const { pathname } = location;

    const routes = [
        { path: '/', page: <Landing /> },
        { path: '/home', page: <Home /> },
        { path: '/about', page: <About /> }
    ];

    return (
        <Routes location={location} key={pathname}>
            {routes.map(({ path, page }) => <Route key={path} path={path} element={page} />)}
        </Routes>
    );
}

export default App;
