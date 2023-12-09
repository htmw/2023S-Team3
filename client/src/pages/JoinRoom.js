import React, { useEffect, useState } from "react";
import { Button, Grid, Modal } from "@mui/material";
import { getClient, getUserTracks, rtmClient } from "../helpers/connect.js";
import { useNavigate, useParams } from "react-router-dom";
import { AgoraVideoPlayer } from "agora-rtc-react";
import MarkAttendance from "../components/MarkAttendance.js";
import { useCallback } from "react";
import { ScreenShare } from "./ScreenShare.js";
import useApi from "../helpers/useApi.js";
import { parseJwt } from "../helpers/utils.js";
export default function JoinRoom() {
  let navigate = useNavigate();
  const api = useApi();
  var uid;
  const token = localStorage.getItem("token");
  const sessionData = JSON.parse(parseJwt(token));
  if (!sessionData.email) {
    navigate("/");
  }
  var { roomName } = useParams();
  function setUId() {
    uid = sessionStorage.getItem("uid");
    if (!uid) {
      uid = String(Math.floor(Math.random() * 10000));
      sessionStorage.setItem("uid", uid);
    }
  }
  async function toggleScreenShare() {
    if (screenShared) {
      setScreenShared(false);
      client.unpublish();
      await tracks[0].setEnabled(true);
      await tracks[1].setEnabled(true);
      setTrackState({ video: true, audio: true });
      if (tracks) await client.publish([tracks[0], tracks[1]]);

      rtmChannel.sendMessage({
        text: JSON.stringify({
          type: "stop_screen_share",
          screenSharingUser: uid,
        }),
      });
    } else {
      setScreenShared(true);
      client.unpublish();
      rtmChannel.sendMessage({
        text: JSON.stringify({
          type: "screen_share",
          screenSharingUser: uid,
        }),
      });
    }
  }
  function setRoomName() {
    if (!roomName) {
      roomName = "main";
    }
  }
  async function takeAttendance() {
    let response = await api.post(
      process.env.BACKEND_URL + "/startAttendance",
      { owner_name: sessionData.email, room_name: roomName }
    );
    rtmChannel.sendMessage({
      text: JSON.stringify({
        type: "mark_attendance",
        attendance_id: response.data[0][0].id,
      }),
    });
    loadAttendances(response.data[0][0].id);
  }
  async function loadAttendances(id) {
    setAttendanceLoading(true);
    setShowAttendanceResult(true);
    let timer = setInterval(async () => {
      let response = await api.get(
        process.env.BACKEND_URL + "/attendanceLogs",
        {
          attendance_id: id,
        }
      );
      setAttendanceResults(response.data[0] || []);
    }, 5000);
    setTimeout(() => {
      clearInterval(timer);
      setAttendanceLoading(false);
    }, 120000);
  }
  const closeAttendanceModal = useCallback(() => {
    setShowAttendancePopup(false);
  });
  setUId();
  setRoomName();
  const client = getClient();
  const { ready, tracks } = getUserTracks();
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [videoWidth, setVideoWidth] = useState(12);
  const [showAttendancePopup, setShowAttendancePopup] = useState(false);
  const [rtmChannel, setRtmChannel] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [attendanceId, setAttendanceId] = useState(null);
  const [showAttendanceResult, setShowAttendanceResult] = useState(false);
  const [attendanceResults, setAttendanceResults] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [screenSharingId, setScreenSharingId] = useState(null);
  const [screenShared, setScreenShared] = useState(false);

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
        await client.join(
          process.env.APP_ID,
          roomName,
          process.env.TOKEN || null,
          uid
        );
        if (tracks) await client.publish([tracks[0], tracks[1]]);
        await rtmClient.login({ uid: uid });
        await rtmClient.addOrUpdateLocalUserAttributes({ name: uid });
        let rtmChannelTemp = await rtmClient.createChannel(roomName);
        await rtmChannelTemp.join();
        await rtmChannelTemp.on("ChannelMessage", (messageData, MemberId) => {
          let data = JSON.parse(messageData.text);
          if (data.type === "mark_attendance") {
            setAttendanceId(data.attendance_id);
            setShowAttendancePopup(true);
          } else if (data.type === "screen_share") {
            setScreenSharingId(data.screenSharingUser);
          } else if (data.type === "stop_screen_share") {
            setScreenSharingId(null);
          }
        });
        setRtmChannel(rtmChannelTemp);
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
      if (count < 3) {
        return 100 / count;
      } else if (count <= 8) {
        return 100 / (count % 2 === 0 ? count / 2 : count / 2 + 1);
      } else if (count < 16) {
        return 100 / 4;
      }
      return 100 / 5;
    }
    setVideoWidth(getWidth(users.length) + "%");
  }, [users, tracks]);

  useEffect(() => {
    (async () => {
      let response = await api.post(process.env.BACKEND_URL + "/joinRoom", {
        room_name: roomName,
      });
      if (response?.data[0][0]) {
        if (
          response?.data[0][0].message ===
          "Room does not exist or is not currently available."
        ) {
          navigate("/");
        } else if (response?.data[0][0].owner_name === sessionData.email) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        navigate("/");
      }
    })();
  }, []);
  useEffect(
    () => () => {
      (async () => {
        if (screenShared) {
          toggleScreenShare();
        }
        client.removeAllListeners();
        await client.leave();
        location.reload();
      })();
    },
    []
  );
  return (
    <div className="bg-gray-700 h-full">
      {" "}
      {start && (
        <div className="  h-full p-4 flex flex-col">
          <div className="flex justify-between grow">
            <div className="flex flex-col grow">
              <div className="grow flex w-full flex-wrap justify-center items-center">
                {users.length > 0 ? (
                  users.map((user) => {
                    if (
                      user.videoTrack &&
                      (screenSharingId === null || screenSharingId === user.uid)
                    ) {
                      return (
                        <div
                          className=" aspect-video"
                          style={{
                            height: videoWidth,
                          }}
                        >
                          <AgoraVideoPlayer
                            videoTrack={user.videoTrack}
                            key={user.uid}
                            style={{ height: "100%", width: "100%" }}
                            className="w-36 h-36 rounded-2xl p-2 agora-player"
                          />
                        </div>
                      );
                    } else return null;
                  })
                ) : (
                  <div className="flex grow justify-center items-center">
                    <span className=" text-white font-bold animate-pulse">
                      No video available / Waiting for others to join
                    </span>
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-2 items-end z-10">
                <Button
                  variant="contained"
                  title="Audio"
                  onClick={() => mute("audio")}
                >
                  {trackState.audio ? (
                    <span className="material-symbols-outlined">mic</span>
                  ) : (
                    <span className="material-symbols-outlined">mic_off</span>
                  )}
                </Button>
                <Button
                  variant="contained"
                  title="Video"
                  onClick={() => mute("video")}
                >
                  {trackState.video ? (
                    <span className="material-symbols-outlined">videocam</span>
                  ) : (
                    <span className="material-symbols-outlined">
                      videocam_off
                    </span>
                  )}
                </Button>
                <Button
                  variant="contained"
                  title="Exit"
                  onClick={() => leaveChannel()}
                >
                  <span className="material-symbols-outlined">logout</span>
                </Button>
                {isAdmin && (
                  <>
                    <Button
                      variant="contained"
                      disabled={attendanceLoading}
                      title="Mark Attendance"
                      onClick={() => takeAttendance()}
                    >
                      <span className="material-symbols-outlined">group</span>
                    </Button>
                    <Button
                      variant="contained"
                      title={
                        screenShared
                          ? "Stop Screen Sharing"
                          : "Share Your Screen"
                      }
                      onClick={() => toggleScreenShare()}
                    >
                      <span className="material-symbols-outlined">
                        {screenShared ? "stop_screen_share" : "screen_share"}
                      </span>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-end items-center z-20 flex-col bg-gray-600 p-2 rounded-2xl">
              {showAttendanceResult && (
                <div className="flex flex-col grow p-1 w-36 items-center">
                  <h2 className="text-white p-1 text-yellow-400 font-bold mb-2">
                    Attendance
                  </h2>
                  {attendanceResults.map((result) => {
                    return (
                      <span className="text-green-200">{result.user_name}</span>
                    );
                  })}
                  {attendanceLoading && (
                    <span className="animate-pulse text-gray-200 mt-4">
                      Loading...
                    </span>
                  )}
                </div>
              )}{" "}
              {!screenShared ? (
                <AgoraVideoPlayer
                  className=" w-36 h-36 rounded-2xl agora-player"
                  videoTrack={tracks[1]}
                />
              ) : (
                <ScreenShare client={client}></ScreenShare>
              )}
            </div>
            <Modal open={showAttendancePopup} className="bg-white">
              <MarkAttendance
                roomName={roomName}
                username={sessionData.username}
                attendanceId={attendanceId}
                closeModal={closeAttendanceModal}
              />
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
