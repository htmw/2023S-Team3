import React, { useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Button } from "@mui/material";
export default function JoinRoom() {
  const APP_ID = process.env.APP_ID;
  let uid = sessionStorage.getItem("uid");
  if (!uid) {
    uid = String(Math.floor(Math.random() * 10000));
    sessionStorage.setItem("uid", uid);
  }
  let token = null;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let roomId = urlParams.get("roomName");
  if (!roomId) {
    roomId = "main";
  }
  let displayName = sessionStorage.getItem("username");
  if (!displayName) {
    console.log("enter user name");
  }
  var clientData;
  const [streamStarted, setStreamStarted] = React.useState(false);
  const [bigScreen, setBigScreen] = React.useState(null);
  const [otherUsers, setOtherUsers] = React.useState({});
  const [localTracks, setLocalTracks] = React.useState([]);
  const [client, setClient] = React.useState(null);
  const [updOtherUsers, setUpdOtherUsers] = React.useState(0);
  const [showJoinButton, setShowJoinButton] = React.useState(false);

  let joinRoomInit = async function () {
    clientData = await AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    await clientData.join(APP_ID, roomId, token, uid);
    setClient(clientData);
  };
  var joinStream = async function () {
    setStreamStarted(true);
    let tracks = await AgoraRTC.createMicrophoneAndCameraTracks(
      {},
      {
        encoderConfig: {
          width: { min: 640, ideal: 1920, max: 1920 },
          height: { min: 480, ideal: 1080, max: 1080 },
        },
      }
    );
    setTimeout(async () => {
      tracks[1].play(`user-${uid}`);
      await client.publish([tracks[0], tracks[1]]);
    }, 4000);
    setLocalTracks(tracks);
  };
  let handleUserPublished = async function (user, mediaType) {
    let usersTemp = otherUsers;
    if (!usersTemp[user.uid]) {
      usersTemp[user.uid] = {
        user,
        media: [mediaType],
      };
    } else {
      usersTemp[user.uid].media.push(mediaType);
    }
    setOtherUsers(usersTemp);
    await client.subscribe(user, mediaType);
    setUpdOtherUsers(updOtherUsers + 1);
    setTimeout(() => {
      Object.keys(otherUsers).forEach((item) => {
        otherUsers[item].media.forEach((i) => {
          if (i === "video") {
            otherUsers[item].user.videoTrack.play(
              `user-${otherUsers[item].user.uid}`
            );
          }
          if (i === "audio") {
            otherUsers[item].user.audioTrack.play();
          }
        });
      });
    }, 2500);
  };

  let handleUserLeft = async function (user) {
    delete otherUsers[user.uid];
    setOtherUsers(otherUsers);
    setUpdOtherUsers(updOtherUsers + 1);
    setTimeout(() => {
      Object.keys(otherUsers).forEach((item) => {
        otherUsers[item].media.forEach((i) => {
          if (i === "video") {
            otherUsers[item].user.videoTrack.play(
              `user-${otherUsers[item].user.uid}`
            );
          }
          if (i === "audio") {
            otherUsers[item].user.audioTrack.play();
          }
        });
      });
    }, 2500);
  };

  let toggleMic = async function () {
    localTracks[0].setMuted(!localTracks[0].muted);
  };

  let toggleCamera = async function (e) {
    await localTracks[1].setMuted(localTracks[1].muted);
  };
  useEffect(() => {
    joinRoomInit();
  }, []);
  useEffect(() => {
    if (client) {
      setShowJoinButton(true);
      client.on("user-published", handleUserPublished);
      client.on("user-left", handleUserLeft);
    }
  }, [client]);
  return (
    <>
      <div className="flex  flex-col h-[100vh]">
        <main className="flex flex-col grow">
          <div
            id="room__container"
            className="flex grow flex-col items-center p-8 justify-between"
          >
            <section id="stream__container grow">
              {bigScreen && <div id="stream__box" className="w-64 h-64"></div>}

              <div id="streams__container">
                <div className="flex flex-row gap-5" key={updOtherUsers}>
                  {Object.keys(otherUsers).map((item) => (
                    <div
                      key={item}
                      className="video__container w-32 h-32"
                      id={`user-container-${otherUsers[item].user.uid}`}
                    >
                      <div
                        className="video-player w-32 h-32"
                        id={`user-${otherUsers[item].user.uid}`}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-4">
                  <div
                    className="video__container w-32 h-32"
                    id={`user-container-${uid}`}
                  >
                    <div
                      className="video-player w-32 h-32"
                      id={`user-${uid}`}
                    ></div>
                  </div>
                </div>
              </div>
            </section>
            {streamStarted && (
              <div className="stream__actions">
                <button
                  onClick={toggleCamera}
                  id="camera-btn"
                  className="active"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
                  </svg>
                </button>
                <button onClick={toggleMic} id="mic-btn" className="active">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" />
                  </svg>
                </button>
              </div>
            )}
            {!streamStarted && showJoinButton && (
              <Button variant="contained" onClick={joinStream}>
                Join Stream
              </Button>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
