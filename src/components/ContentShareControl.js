import React from "react";
import {
  ControlBarButton,
  useVideoInputs,
  useMeetingManager,
  useContentShareState,
  Laptop,
} from "amazon-chime-sdk-component-library-react";

const ContentShareControl = () => {
  const { selectedDevice } = useVideoInputs();
  const { isLocalUserSharing } = useContentShareState();
  const meetingManager = useMeetingManager();
  async function promotedContentShare() {
    console.log("promotedContentShare");
    const constraint = {
      video: {
        deviceId: { exact: `${selectedDevice}` },
        framerate: { ideal: 25 },
        height: { ideal: 720 },
        width: { ideal: 1280 },
      },
    };
    console.log("constraint", constraint, selectedDevice);
    const stream = await navigator.mediaDevices.getUserMedia(constraint);
    await meetingManager?.audioVideo?.startContentShare(stream);
  }
  async function stopContentShare() {
    console.log("stopContentShare");
    await meetingManager?.audioVideo?.stopContentShare();
  }

  return (
    <ControlBarButton
      icon={<Laptop />}
      onClick={isLocalUserSharing ? stopContentShare : promotedContentShare}
      label="Screen"
    />
  );
};

export default ContentShareControl;
