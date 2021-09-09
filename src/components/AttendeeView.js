import React from "react";
import {
  ContentShare,
  LocalVideo,
  useMeetingStatus,
} from "amazon-chime-sdk-component-library-react";
import styled from "styled-components";
import AudioInputControl from "./AudioInputControl";
import VideoInputControl from "./VideoInputControl";
import ContentShareControl from "./ContentShareControl";
import SettingInputControl from "./SettingInputControl";

const StyledContent = styled.div`
  position: absolute;
  height: 200px;
  width: 250px;
  z-index: 2;
`;

const StyledWrapper = styled.div`
  width: 100%;
`;

const CameraContent = styled.div`
  display: flex;
`;

function AttendeeView() {
  const meetingStatus = useMeetingStatus();
  console.log("[meetingStatus]", meetingStatus);

  return (
      <StyledWrapper>
        <StyledContent>
          <LocalVideo />
          <CameraContent>
            <AudioInputControl />
            <VideoInputControl />
            <ContentShareControl />
            <SettingInputControl />
          </CameraContent>
        </StyledContent>
        <ContentShare />
      </StyledWrapper>
  );
}

export default AttendeeView;
