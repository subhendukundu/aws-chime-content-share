import React, { useEffect, useState } from "react";
import {
  MeetingStatus,
  RemoteVideo,
  useLocalVideo,
  useMeetingStatus,
  useRemoteVideoTileState,
  useRosterState,
  useAudioVideo,
  VideoGrid,
} from "amazon-chime-sdk-component-library-react";
import styled from "styled-components";

const StyledId = styled.div`
  position: absolute;
  z-index: 1;
  background-color: ${props => props.promoted ? "wheat" : "transparent"};
  padding: 10px;
`;

function CuratorView({ name }) {
  const audioVideo = useAudioVideo();
  const [featureId, setFeatureId] = useState("");
  const { attendeeIdToTileId } = useRemoteVideoTileState();
  console.log(attendeeIdToTileId);

  async function promotedUser(attendeeId) {
    console.log("promotedContentShare");
    audioVideo.realtimeSendDataMessage("feature", attendeeId);
    setFeatureId(attendeeId);
  }

  const videos = Object.keys(attendeeIdToTileId).map((attendeeId, index) => {
    console.log("attendeeId", attendeeId, attendeeIdToTileId[attendeeId], featureId);
    return (
      <button onClick={() => promotedUser(attendeeId)} key={attendeeId}>
        <StyledId promoted={featureId === attendeeId}>{attendeeId}</StyledId>
        <RemoteVideo tileId={attendeeIdToTileId[attendeeId]} />
      </button>
    );
  });
  return <VideoGrid>{videos}</VideoGrid>;
}

export default CuratorView;
