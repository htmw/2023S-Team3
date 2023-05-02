import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import Webcam from "react-webcam";
import api from "../helpers/api";
const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};

const MarkAttendance = ({ closeModal, attendanceId, roomName, username }) => {
  const webcamRef = React.useRef(null);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const capture = React.useCallback(() => {
    let imgSrc = webcamRef.current.getScreenshot();
    setImageSrc(imgSrc);
  }, [webcamRef]);
  const verifyImage = async () => {
    let response = await axios.post("https://simplyonline.eastus.cloudapp.azure.com:5000/verify", {
      data_url: imageSrc,
    });
    var res = [];
    response.data.forEach((item) => {
      var itemJson = JSON.parse(item);
      res.push(itemJson.identity);
    });
    let faceFound = false;
    let keys = Object.keys(res[0]);
    for (let i = 0; i < keys.length; i++) {
      debugger;
      if (
        res[0][keys[i]] &&
        res[0][keys[i]].toLowerCase().includes(username.toLowerCase())
      ) {
        faceFound = true;
      }
    }
    if (attendanceId && username && faceFound) {
      let response = await api.post(
        process.env.BACKEND_URL + "/attendanceLog",
        {
          attendance_id: attendanceId,
          user_name: username,
          room_name: roomName,
        }
      );
      if (response.data[0][0]) {
        setResult(true);
        setTimeout(() => {
          closeModal();
        }, 2000);
      }
    } else {
      setResult(false);
    }
  };
  return (
    <div className="text-center p-4">
      <div className="inline-flex flex-col justify-center items-center gap-4 border border-gray-900 p-4">
        <div className="bg-gray-900 text-white p-4 flex justify-between w-full">
          <div>Mark Attendance</div>
          <div
            onClick={() => {
              closeModal();
            }}
            className="cursor-pointer"
          >
            close
          </div>
        </div>
        {!imageSrc && (
          <>
            <Webcam
              audio={false}
              height={300}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              videoConstraints={videoConstraints}
            />
            <Button variant="contained" onClick={capture}>
              Capture
            </Button>
          </>
        )}
        {imageSrc && (
          <>
            <img src={imageSrc}></img>
            <Button
              variant="contained"
              disabled={result}
              onClick={() => {
                setImageSrc(null);
                setResult(null);
              }}
            >
              Retake
            </Button>
            <Button
              variant="contained"
              disabled={result}
              onClick={() => {
                verifyImage();
              }}
            >
              Verify
            </Button>
            <div className="flex flex-col" key={result}>
              {result === true && (
                <span className="text-green-700 font-bold">
                  Attendance Marked Successfully
                </span>
              )}
              {result === false && (
                <span className="text-red-700 font-bold">
                  Failed to mark attendance
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default MarkAttendance;
