import React from "react";
import {
  ControlBarButton,
  Microphone,
  useToggleLocalMute,
} from "amazon-chime-sdk-component-library-react";

const AudioInputControl = ({
  muteLabel = "Mute",
  unmuteLabel = "Unmute",
  mutedIconTitle,
  unmutedIconTitle,
}) => {
  const { muted, toggleMute } = useToggleLocalMute();
  return (
    <ControlBarButton
      icon={
        <Microphone
          muted={muted}
          mutedTitle={mutedIconTitle}
          unmutedTitle={unmutedIconTitle}
        />
      }
      onClick={toggleMute}
      label={muted ? unmuteLabel : muteLabel}
    />
  );
};

export default AudioInputControl;
