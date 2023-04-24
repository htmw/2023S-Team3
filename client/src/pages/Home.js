import Image from "../assets/video-conference.jpg";
import {
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../helpers/api";
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
    const [createOpen, setCreateOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCreateOpen = () => setCreateOpen(true);
    const handleCreateClose = () => setCreateOpen(false);
    const [roomName, setRoomName] = React.useState("");
    const [userName, setUserName] = React.useState(sessionStorage.getItem("username") || "");
    const isRoomNameValid = roomName.trim() !== '';
    const isUserNameValid = userName.trim() !== '';
    const [roomNameTouched, setRoomNameTouched] = React.useState(false);
    const [userNameTouched, setUserNameTouched] = React.useState(false);
    const [roomAlreadyExists, setRoomAlreadyExists] = React.useState(false);
    const [roomDoesnotExist, setRoomDoesnotExist] = React.useState(false);
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
            <button
             onClick={handleCreateOpen}
             className="px-4 py-3 w-full rounded backdrop-blur-sm bg-blue-700/70 text-xl uppercase text-white font-semibold">
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
                    onChange={(data)=>{
                      setRoomName(data.target.value);
                      setRoomNameTouched(true);
                      setRoomDoesnotExist(false)
                    }}
                    required
                    error={(!isRoomNameValid && roomNameTouched) || roomDoesnotExist}
                    helperText={isRoomNameValid || !roomNameTouched ? roomDoesnotExist ? 'Room Doesnot exist' : '' : 'Room Name is required'}
                  />
                  <TextField
                    label="Username"
                    variant="outlined"
                    id="my-input"
                    margin="normal"
                    InputLabelProps={{ className: "text-white" }}
                    aria-describedby="my-helper-text"
                    defaultValue={userName}
                    onChange={(data)=>{setUserName(data.target.value);setUserNameTouched(true);}}
                    required
                    error={!isUserNameValid && userNameTouched}
                    helperText={isUserNameValid || !userNameTouched ? '' : 'Username is required'}
                  />
                </FormControl>
                <Button onClick={async ()=>{
                  
                  setUserNameTouched(true);
                  setRoomNameTouched(true);
                  if (isRoomNameValid && isUserNameValid) {
                    let response = await api.post(process.env.BACKEND_URL + "/joinRoom",{
                      room_name: roomName
                    })
                    if(response.data[0][0]?.message) {
                      if(response.data[0][0]?.message === "Room does not exist or is not currently available.") {
                        setRoomDoesnotExist(true)
                      } else {
                        sessionStorage.setItem("username",userName)
                        let path = `/room/${roomName}`; 
                        navigate(path);
                      }
                    } else {
                      sessionStorage.setItem("username",userName)
                      let path = `/room/${roomName}`; 
                      navigate(path);
                    }
                  }
                }} variant="contained">Join</Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={createOpen}
          onClose={handleCreateClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={createOpen}>
            <Box sx={style}>
              <div className="flex flex-col gap-4 ">
                <h3 className="uppercase text-xl text-center font-semibold ">
                  Create Room
                </h3>
                <FormControl className="w-full">
                  <TextField
                    label="Room Name"
                    variant="outlined"
                    id="my-input"
                    margin="normal"
                    aria-describedby="my-helper-text"
                    defaultValue={roomName}
                    onChange={(data)=>{
                      setRoomName(data.target.value);
                      setRoomNameTouched(true);
                      setRoomAlreadyExists(false)
                    }}
                    required
                    error={(!isRoomNameValid && roomNameTouched) || roomAlreadyExists}
                    helperText={isRoomNameValid || !roomNameTouched ? roomAlreadyExists ? 'Room Name Already Exists' : '' : 'Room Name is required'}
                  />
                  <TextField
                    label="Username"
                    variant="outlined"
                    id="my-input"
                    margin="normal"
                    InputLabelProps={{ className: "text-white" }}
                    aria-describedby="my-helper-text"
                    defaultValue={userName}
                    onChange={(data)=>{
                      setUserName(data.target.value);
                      setUserNameTouched(true);
                    }}
                    required
                    error={(!isUserNameValid && userNameTouched)}
                    helperText={isUserNameValid || !userNameTouched ? '' : roomAlreadyExists ? 'Room Name Already Exists' : 'Username is required'}
                  />
                </FormControl>
                <Button onClick={async ()=>{
                    setUserNameTouched(true);
                    setRoomNameTouched(true);
                    if (isRoomNameValid && isUserNameValid) {
                      let response = await api.post(process.env.BACKEND_URL + "/createRoom",{
                        room_name: roomName,
                        user_name: userName
                      })
                      if(response.data[0][0]?.message) {
                        if(response.data[0][0]?.message === "Room created successfully.") {
                          sessionStorage.setItem("username",userName)
                          let path = `/room/${roomName}`; 
                          navigate(path);
                        } else {
                          setRoomAlreadyExists(true)
                        }

                      } else {
                        
                      }
                      
                    }
                }} variant="contained">Create & Join</Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}

export default Home;
