import { BrowserRouter } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
import AppRouter from "./routes/AppRouter";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}
            <AppRouter />
            {/* <Footer /> */}
        </BrowserRouter>
    );
}

export default App;