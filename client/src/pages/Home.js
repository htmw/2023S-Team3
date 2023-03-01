import Image from "../assets/video-conference.jpg";
import {
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
  Input,
  InputLabel,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  borderRadius: "8px",
  opacity: [0.9, 0.8, 0.7],
  boxShadow: 24,
  p: 4,
};

function Home() {
    let navigate = useNavigate(); 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [roomName, setRoomName] = React.useState("");
  const [userName, setUserName] = React.useState(sessionStorage.getItem("username") || "");
  return (
    <>
      <div className="flex relative bg-black">
        <img
          className=" opacity-20 flex h-[100vh] grow object-cover justify-center"
          src={Image}
        ></img>
        <div className=" absolute flex flex-col gap-28 w-full h-full pt-24 items-center">
          <div className="flex flex-col w-56 justify-center">
            <h2 className=" text-3xl text-white self-end font-bold">
              Simply Online
            </h2>
            <span className="text-sm text-white self-end">
              Simple way to connect
            </span>
          </div>
          <div className="flex flex-col gap-6 w-56">
            <button className="px-4 py-3 w-full rounded backdrop-blur-sm bg-blue-700/70 text-xl uppercase text-white font-semibold">
              Create Room
            </button>
            <button
              onClick={handleOpen}
              className="px-4 py-3 w-full rounded backdrop-blur-sm bg-blue-600/70 text-xl uppercase text-white font-semibold"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div className="flex flex-col gap-4 ">
                <h3 className="uppercase text-xl text-center font-semibold ">
                  Join Room
                </h3>
                <FormControl className="w-full">
                  <TextField
                    label="Room Name"
                    variant="outlined"
                    id="my-input"
                    margin="normal"
                    aria-describedby="my-helper-text"
                    defaultValue={roomName}
                    onChange={(data)=>{setRoomName(data.target.value)}}
                  />
                  <TextField
                    label="Username"
                    variant="outlined"
                    id="my-input"
                    margin="normal"
                    InputLabelProps={{ className: "text-white" }}
                    aria-describedby="my-helper-text"
                    defaultValue={userName}
                    onChange={(data)=>{setUserName(data.target.value)}}
                  />
                </FormControl>
                <Button onClick={()=>{
                    console.log(userName,roomName)
                    sessionStorage.setItem("username",userName)
                    let path = `/room/${roomName}`; 
                    navigate(path);
                }} variant="contained">Join</Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default Home;
