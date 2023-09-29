import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import useApi from "./helpers/useApi";
import { Outlet } from "react-router-dom";
import { parseJwt } from "./helpers/utils";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const api = useApi();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setUsername();
    if (token) {
      (async () => {
        try {
          const sessionData = JSON.parse(parseJwt(token));
          setUsername(sessionData.username);
          const userLoggedIn = await isUserLoggedIn();
          if (!userLoggedIn) {
            navigate("login");
          }
        } catch (e) {
          navigate("/login");
        }
      })();
    } else {
      navigate("/login");
    }
    setLoading(false);
  }, []);
  async function isUserLoggedIn() {
    try {
      let response = await api.post(
        process.env.BACKEND_URL + "/validateToken",
        {}
      );
      return response?.data?.isValid;
    } catch (err) {
      throw err;
    }
  }
  return loading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="flex flex-col h-full">
      <header className="flex w-full justify-between items-center flex-shrink-0 p-4 bg-gray-400 text-white">
        <h1 className="text-xl font-bold">Simply Online</h1>
        <div className="flex gap-2 items-center">
          <span>
            Hello <b>{username}</b>
          </span>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Logout
          </Button>
        </div>
      </header>
      <div className="flex-shrink h-full overflow-hidden">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
