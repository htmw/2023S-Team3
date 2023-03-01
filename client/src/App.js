import "./App.css";
import NoPage from './pages/NoPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateRoom from "./pages/CreateRoom";
import Home from "./pages/Home";
import JoinRoom from "./pages/JoinRoom";
import { StrictMode } from "react";

function App() {
  return (
    <>
      <StrictMode> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="create" element={<CreateRoom />} />
            <Route path="room/:roomName" element={<JoinRoom />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </>
  );
}

export default App;
