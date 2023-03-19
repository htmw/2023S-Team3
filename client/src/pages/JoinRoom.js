import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import {
  getClient,
  getUserTracks
} from "../helpers/connect.js";
import { useNavigate } from "react-router-dom";
import { AgoraVideoPlayer } from "agora-rtc-react";
export default function JoinRoom() {
  let navigate = useNavigate(); 
  var uid, roomName, displayName;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  function setUId() {
    uid = sessionStorage.getItem("uid");
    if (!uid) {
      uid = String(Math.floor(Math.random() * 10000));
      sessionStorage.setItem("uid", uid);
    }
  }
  function setRoomName() {
    roomName = urlParams.get("roomName");
    if (!roomName) {
      roomName = "main";
    }
  }
  function setDisplayName() {
    displayName = sessionStorage.getItem("username");
    if (!displayName) {
      console.log("enter user name");
    }
  }
  setUId()
  setRoomName()
  setDisplayName()
  const client = getClient();
  const { ready, tracks } = getUserTracks();
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [videoWidth, setVideoWidth] = useState(12);

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    navigate("/");
  };
  useEffect(() => {
    let init = async () => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });
      try {
        await client.join(process.env.APP_ID, roomName, process.env.TOKEN || null, uid);
        if (tracks) await client.publish([tracks[0], tracks[1]]);
        setStart(true);
      } catch (error) {
        console.log(error);
      }
      
    };

    if (ready && tracks) {
      try {
        init();
      } catch (error) {
        console.log(error);
      }
    }
  }, [client, ready, tracks]);
  useEffect(() => {
    function getWidth(count) {
      if(count < 3) {
        return (100 / count)
      } else if(count <= 8) {
        return (100 / ((count%2 === 0) ? (count/2) : ((count/2) + 1) ))
      } else if(count < 16) {
        return (100/4)
      }
      return (100/5)
    }
    setVideoWidth(getWidth(users.length) + "%");
  }, [users, tracks]);
  return (
    <div className="bg-gray-700"> {start && (
      <div className="  h-[100vh] p-4 flex flex-col">
        <div className="flex justify-between grow">
          <div className="flex flex-col grow">
            <div className="grow flex w-full flex-wrap justify-center items-center">
              {users.length > 0 ?
                users.map((user) => {
                  if (user.videoTrack) {
                    return (
                      <div className=" aspect-video" style={
                        {
                          height: videoWidth
                        }
                      }>
                        <AgoraVideoPlayer
                          videoTrack={user.videoTrack}
                          key={user.uid}
                          style={{ height: "100%", width: "100%" }}
                          className="w-36 h-36 rounded-2xl p-2 agora-player"
                        />
                      </div>
                    );
                  } else return null;
                }) : 
                <div className="flex grow justify-center items-center">
                  <span className=" text-white font-bold animate-pulse">No video available / Waiting for others to join</span>
                </div>
              }
            </div>
            <div className="flex justify-center gap-2 items-end z-10">
              <Button
                variant="contained"
                onClick={() => mute("audio")}
              >
                {trackState.audio ? 
                <span className="material-symbols-outlined">mic</span> : 
                <span className="material-symbols-outlined">mic_off</span>
                }
              </Button>
              <Button
                variant="contained"
                onClick={() => mute("video")}
              >
                {trackState.video ? 
                <span className="material-symbols-outlined">videocam</span> : 
                <span className="material-symbols-outlined">videocam_off</span>
                }
              </Button>
              <Button
                variant="contained"
                onClick={() => leaveChannel()}
              ><span className="material-symbols-outlined">logout</span>
              </Button>
            </div>
          </div>
          <div className="flex justify-end items-end z-20">
          <AgoraVideoPlayer className=" w-36 h-36 rounded-2xl agora-player"
            videoTrack={tracks[1]}
          />
        </div>
        </div>
      </div>
    )}
    </div>
  );
}
