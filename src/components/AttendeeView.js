import React, { useEffect, useState } from "react";
import {
  LocalVideo,
  useMeetingStatus,
  useAudioVideo,
  useMeetingManager,
  useRemoteVideoTileState,
  RemoteVideo,
} from "amazon-chime-sdk-component-library-react";
import styled from "styled-components";
import AudioInputControl from "./AudioInputControl";
import VideoInputControl from "./VideoInputControl";
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

function AttendeeView({ name, attendeeId }) {
  const [featureTileId, setFeatureTileId] = useState(0);
  const meetingStatus = useMeetingStatus();
  console.log("[meetingStatus]", meetingStatus);
  const audioVideo = useAudioVideo();
  const meetingManager = useMeetingManager();
  const videoUplinkPolicy =
    meetingManager.meetingSession?.configuration?.videoUplinkBandwidthPolicy;
  const { attendeeIdToTileId } = useRemoteVideoTileState();
  console.log("[attendeeIdToTileId]", attendeeIdToTileId);

  useEffect(() => {
    function dataMessageHandler(dataMessage) {
      if (dataMessage.topic === "feature") {
        const featureAttendeeId = dataMessage.text();
        console.log(
          "dataMessagedataMessage",
          featureAttendeeId,
          attendeeIdToTileId
        );
        const tileId = attendeeIdToTileId[featureAttendeeId];
        setFeatureTileId(tileId);
        if (attendeeId === featureAttendeeId) {
          videoUplinkPolicy.setHasBandwidthPriority(true);
          videoUplinkPolicy.updateTransceiverController();
        } else {
          videoUplinkPolicy.setHasBandwidthPriority(false);
          videoUplinkPolicy.updateTransceiverController();
          audioVideo.unpauseVideoTile(tileId);
        }
      }
    }

    audioVideo?.realtimeSubscribeToReceiveDataMessage(
      "feature",
      (dataMessage) => {
        dataMessageHandler(dataMessage);
      }
    );
    return () => {
      audioVideo?.realtimeUnsubscribeFromReceiveDataMessage("feature");
    };
  }, [audioVideo, name, videoUplinkPolicy, attendeeIdToTileId, attendeeId]);

  useEffect(() => {
    if (!audioVideo) {
      return;
    }

    const observer = {
      videoTileDidUpdate: (tileState) => {
        console.log("[videoTileDidUpdate]");
        if (
          tileState?.boundAttendeeId &&
          tileState?.tileId &&
          !tileState.isContent &&
          !tileState.localTile
        ) {
          // audioVideo.pauseVideoTile(tileState?.tileId);
        }
      },
    };
    audioVideo.addObserver(observer);
    return () => audioVideo.removeObserver(observer);
  }, [audioVideo]);

  return (
    <StyledWrapper>
      <StyledContent>
        <LocalVideo />
        <CameraContent>
          <AudioInputControl />
          <VideoInputControl />
          <SettingInputControl />
        </CameraContent>
      </StyledContent>
      {!!featureTileId && <RemoteVideo tileId={featureTileId} />}
    </StyledWrapper>
  );
}

export default AttendeeView;
