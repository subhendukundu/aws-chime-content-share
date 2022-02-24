import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import {
  MeetingProvider,
  UserActivityProvider,
  lightTheme, MeetingManager,
} from "amazon-chime-sdk-component-library-react";

import AttendeeView from "./views/AttendeeMeeting";
import { ThemeProvider as SystemProvider } from "styled-components";
import Store from "./store";
import {DefaultActiveSpeakerPolicy, LogLevel} from "amazon-chime-sdk-js";

class VideoQualityActiveSpeakerPolicy extends DefaultActiveSpeakerPolicy {
  prioritizeVideoSendBandwidthForActiveSpeaker() {
    return false;
  }
}

const enableWebAudio = true;
const activeSpeakerPolicy = new VideoQualityActiveSpeakerPolicy();
const meetingConfig = {
  enableWebAudio,
  activeSpeakerPolicy
};

const meetingManager = new MeetingManager({ logLevel: LogLevel.DEBUG });

const StyledLayout = styled.main`
  display: block;
  min-height: 100vh;
  width: 100%;
  @media (min-width: 600px) and (min-height: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & > div {
    display: flex;
    flex: 1;
    flexdirection: column;
    width: 100%;
    height: 100vh;
  }
`;

function App() {
  return (
    <SystemProvider theme={lightTheme}>
      <StyledLayout>
        <MeetingProvider {...meetingConfig}>
          <UserActivityProvider>
            <Store>
              <Router>
                <Switch>
                  <Route path="/">
                    <AttendeeView />
                  </Route>
                </Switch>
              </Router>
            </Store>
          </UserActivityProvider>
        </MeetingProvider>
      </StyledLayout>
    </SystemProvider>
  );
}

export default App;
