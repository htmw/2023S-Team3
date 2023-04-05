import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import Webcam from "react-webcam";
const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user"
  };
  
  const MarkAttendance = (props) => {
    const webcamRef = React.useRef(null);
    const [imageSrc, setImageSrc] = React.useState(null)
    const [result, setResult] = React.useState([])
    const capture = React.useCallback(
      () => {
        let imgSrc = webcamRef.current.getScreenshot();
        setImageSrc(imgSrc)
      },
      [webcamRef]
    );
    const verifyImage = async ()=> {
        let response = await axios.post("http://127.0.0.1:5000/verify", {
            data_url:  imageSrc
        })
        var res = JSON.parse(JSON.stringify(result))
        response.data.forEach((item)=> {

            var itemJson = JSON.parse(item)
            res.push(itemJson.identity)
        })
        setResult(res)
        console.log(res)
    }
    return (
    <div className="text-center p-4">
        <div className="inline-flex flex-col justify-center items-center gap-4 border border-gray-900 p-4">
            <div className="bg-gray-900 text-white p-4 flex justify-between w-full">
                <div>Mark Attendance</div>
                <div onClick={()=> {props.closeModal()}} className="cursor-pointer">close</div>
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
                    <Button variant="contained" onClick={capture}>Capture</Button>
            </>) }
            {
                imageSrc && (
                    <>
                        <img src={imageSrc}></img>
                        <Button variant="contained" onClick={()=> {setImageSrc(null); setResult([])}}>Retake</Button>
                        <Button variant="contained" onClick={()=> {verifyImage()}}>Verify</Button>
                        <div className="flex flex-col" key={result}>{JSON.stringify(result)}</div>
                    </>
                )
            }
        </div>
    </div>
    );
  };
  export default MarkAttendance;