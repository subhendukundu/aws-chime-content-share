import React, { useEffect } from "react";
import {
  MeetingStatus,
  ControlBarButton,
  useLocalVideo,
  Camera,
  useMeetingStatus,
} from "amazon-chime-sdk-component-library-react";

const VideoInputControl = ({ label = "Video" }) => {
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const meetingStatus = useMeetingStatus();

  useEffect(() => {
    if (meetingStatus === MeetingStatus.Succeeded && !isVideoEnabled) {
      toggleVideo();
    }
  }, [meetingStatus]);

  return (
    <ControlBarButton
      icon={<Camera disabled={!isVideoEnabled} />}
      onClick={toggleVideo}
      label={label}
    />
  );
};

export default VideoInputControl;
