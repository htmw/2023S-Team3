import { useEffect } from "react";
import { getUserScreenVideoTracks } from "../helpers/connect";
import { AgoraVideoPlayer } from "agora-rtc-react";

export function ScreenShare(props) {
  const { client } = props;
  const { ready, tracks } = getUserScreenVideoTracks();
  useEffect(() => {
    (async () => {
      if (tracks) {
        await client.publish(tracks);
      }
    })();
  }, [client, tracks, ready]);
  return (
    ready &&
    tracks && (
      <AgoraVideoPlayer
        className="w-36 h-36 rounded-2xl p-2 agora-player"
        videoTrack={tracks}
      />
    )
  );
}