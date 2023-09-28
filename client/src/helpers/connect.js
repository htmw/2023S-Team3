import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import AgoraRTM from "agora-rtm-sdk";

const appConfig = {
  mode: "rtc",
  codec: "vp8",
  appId: process.env.APP_ID,
  token: process.env.TOKEN || null,
};
const getClient = createClient(appConfig);
const getUserTracks = createMicrophoneAndCameraTracks();
const rtmClient = AgoraRTM.createInstance(appConfig.appId);
export { getClient, getUserTracks, rtmClient };
