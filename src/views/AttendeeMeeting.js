import React, { useContext, useEffect } from "react";
import { Join } from "../components/Join";
import { Context } from "../store";
import { createMeetingRequest } from "../utils/api";
import AttendeeView from "../components/AttendeeView";
import {
  Spinner,
  Flex,
  DeviceLabels,
  useMeetingManager,
  useMeetingStatus,
  MeetingStatus,
} from "amazon-chime-sdk-component-library-react";
import CuratorView from "./CuratorView";

function AttendeeMeeting() {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();
  const [state, dispatch] = useContext(Context);
  const { name = "", loading, meetingResponse = {} } = state;
  const { AttendeeId } = meetingResponse?.AttendeeInfo?.Attendee || {};
  console.log("name", name, AttendeeId);

  async function onSubmit(currentName) {
    dispatch({ type: "SET_NAME", payload: currentName });
    const data = {
      input: {
        object: {
          room_id: "050f9e20-db2f-407d-8b99-fe59f05519c3",
          user_id: currentName,
        },
      },
    };
    try {
      const meetingResponse = await createMeetingRequest(data);
      console.log("meetingResponse", meetingResponse);
      const { AttendeeInfo, MeetingInfo } = meetingResponse;
      const joinData = {
        meetingInfo: MeetingInfo,
        attendeeInfo: AttendeeInfo,
        deviceLabels: DeviceLabels.AudioAndVideo,
      };
      await meetingManager.join(joinData);
      await meetingManager.start();
      meetingManager?.audioVideo?.chooseVideoInputQuality(1280, 720, 25, 2000);
      dispatch({ type: "SET_MEETING_INFO", payload: meetingResponse });
    } catch (error) {
      console.log("Meeting joining error", error);
      dispatch({ type: "SET_ERROR", payload: "There was an error!" });
    }
  }

  useEffect(() => {
    if (meetingStatus === MeetingStatus.Succeeded) {
      meetingManager?.audioVideo?.realtimeMuteLocalAudio();
    }
  }, [meetingStatus]);

  useEffect(() => {
    return () => {
      meetingManager?.leave();
    };
  }, [meetingManager]);

  if (loading) {
    return (
      <Flex layout="fill-space-centered">
        <Spinner width="2rem" height="2rem" />
      </Flex>
    );
  }

  if (name === "4ed819bd-c098-41ca-863b-1f445e5e27f9") {
    return <CuratorView />;
  }

  return name?.length <= 0 ? (
    <Join onSubmit={onSubmit} />
  ) : (
    <AttendeeView name={name} attendeeId={AttendeeId} />
  );
}

export default AttendeeMeeting;
