import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useState, useEffect } from "react";
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

export const Video = () => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  return (
    <AgoraRTCProvider client={client}>
      <Basics />
    </AgoraRTCProvider>
  );
};

const Basics = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const appId = "da244d84aefe4ead98173ac429c09705";
  const channel = "testChannel";
  const micOn = true;
  const cameraOn = true;
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(
    micOn && permissionsGranted
  );
  const { localCameraTrack } = useLocalCameraTrack(
    cameraOn && permissionsGranted
  );

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(() => setPermissionsGranted(true))
      .catch(() => setPermissionsGranted(false));
  }, []);

  useJoin(
    { appid: appId, channel: channel, token: null },
    calling && permissionsGranted
  );
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  return (
    <>
      <div>
        {permissionsGranted ? (
          isConnected ? (
            <div>
              <div>
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  playAudio={false}
                  videoTrack={localCameraTrack}
                  style={{ width: "90%", height: 300 }}
                >
                  <samp>You</samp>
                </LocalUser>
              </div>
              {remoteUsers.map((user) => (
                <div key={user.uid}>
                  <RemoteUser user={user} style={{ width: "90%", height: 300 }}>
                    <samp>{user.uid}</samp>
                  </RemoteUser>
                </div>
              ))}
            </div>
          ) : (
            <button onClick={() => setCalling(true)}>Join Channel</button>
          )
        ) : (
          <p>Permission to access camera and microphone is required.</p>
        )}
      </div>
      {isConnected && (
        <div style={{ padding: "20px" }}>
          <div>
            <button onClick={() => setCalling(false)}>End Call</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Video;
