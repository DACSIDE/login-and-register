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
import {
  FiPhoneCall,
  FiVideo,
  FiVideoOff,
  FiMic,
  FiMicOff,
  FiX,
} from "react-icons/fi";
import "./VideoCall.css"; 

export const VideoCall = () => {
  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  return (
    <AgoraRTCProvider client={client}>
      <div className="video-call-container">
        <Basics />
      </div>
    </AgoraRTCProvider>
  );
};

const Basics = () => {
  const [calling, setCalling] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const isConnected = useIsConnected();
  const appId = "da244d84aefe4ead98173ac429c09705";
  const channel = "testChannel";
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
    <div className="video-call-wrapper">
      {!permissionsGranted ? (
        <div className="permission-warning">
          <div className="warning-content">
            <h2>Permission Required</h2>
            <p>
              Please allow access to your camera and microphone to continue.
            </p>
          </div>
        </div>
      ) : !isConnected ? (
        <div className="join-screen">
          <button className="join-button" onClick={() => setCalling(true)}>
            <FiPhoneCall className="button-icon" />
            Join Call
          </button>
        </div>
      ) : (
        <>
          <div className="video-grid">
            <div className="video-tile local-video">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                playAudio={false}
                videoTrack={localCameraTrack}
                className="video-element"
              />
              <div className="user-label">You</div>
              <div className="video-controls">
                <button
                  className={`control-button ${!cameraOn ? "disabled" : ""}`}
                  onClick={() => setCameraOn(!cameraOn)}
                >
                  {cameraOn ? <FiVideo /> : <FiVideoOff />}
                </button>
                <button
                  className={`control-button ${!micOn ? "disabled" : ""}`}
                  onClick={() => setMicOn(!micOn)}
                >
                  {micOn ? <FiMic /> : <FiMicOff />}
                </button>
              </div>
            </div>

            {remoteUsers.map((user) => (
              <div className="video-tile remote-video" key={user.uid}>
                <RemoteUser user={user} className="video-element" />
                <div className="user-label">Participant {user.uid}</div>
              </div>
            ))}
          </div>

          <div className="call-controls">
            <button
              className="end-call-button"
              onClick={() => setCalling(false)}
            >
              <FiX className="button-icon" />
              End Call
            </button>
          </div>

          {remoteUsers.length === 0 && (
            <div className="waiting-message">
              <div className="spinner"></div>
              Waiting for other participants...
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoCall;
