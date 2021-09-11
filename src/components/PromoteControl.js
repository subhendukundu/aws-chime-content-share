import React from "react";
import {
  ControlBarButton,
  useAudioVideo,
  HandRaise,
} from "amazon-chime-sdk-component-library-react";

const PromoteControl = ({ isPromoted, name }) => {
  const audioVideo = useAudioVideo();
  async function promotedUser() {
    console.log("promotedContentShare");
    audioVideo.realtimeSendDataMessage("feature", name);
  }

  return (
    <ControlBarButton
      icon={<HandRaise isRaised={isPromoted} />}
      onClick={promotedUser}
      label="Screen"
    />
  );
};

export default PromoteControl;
