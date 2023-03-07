import "./App.css";
import NoPage from './pages/NoPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import Home from "./pages/Home";
import JoinRoom from "./pages/JoinRoom";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="create" element={<CreateRoom />} />
            <Route path="room/:roomName" element={<JoinRoom />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
