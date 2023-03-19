import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appConfig = {
    mode: "rtc",
    codec: "vp8",
    appId: process.env.appId,
    token: process.env.token || null
};
const getClient = createClient(appConfig);
const getUserTracks = createMicrophoneAndCameraTracks();
export {
    getClient, getUserTracks
}
