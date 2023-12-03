import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button, Modal } from "@mui/material";
function PhotoModal({ value, onChange, error, name, close }) {
  const [openModal, setOpenModal] = useState(false);
  const [faceData, setFaceData] = useState(value);
  const webcamRef = useRef(null);
  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };
  useEffect(() => {
    setFaceData(value);
  }, [value]);
  return (
    <>
      <Modal open={openModal} className="bg-white">
        <div className="flex flex-col justify-center h-full gap-2 items-center">
          {faceData ? (
            <>
              <img src={faceData}></img>
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  color="info"
                  onClick={(event) => {
                    event.target.value = "";
                    setFaceData("");
                    onChange(event);
                  }}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  onClick={(event) => {
                    setOpenModal(false)
                  }}
                >
                  Save
                </Button>
              </div>
              
            </>
            
          ) : (
            <>
              <Webcam
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                videoConstraints={videoConstraints}
              />
              <Button
                variant="contained"
                name={name}
                onClick={(event) => {
                  let imgSrc = webcamRef.current.getScreenshot();
                  event.target.value = imgSrc;
                  setFaceData(imgSrc);
                  onChange(event);
                }}
              >
                Take photo
              </Button>
            </>
          )}
        </div>
      </Modal>
      <Button
        variant="outlined"
        color={faceData ? "success" : error ? "error" : "info"}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <div className="flex items-center justify-center gap-1">
          <i>*</i>Register Face {faceData &&(<i className="material-symbols-outlined text-green-600">check_circle</i>)}
        </div>
      </Button>
    </>
  );
}
export default PhotoModal;