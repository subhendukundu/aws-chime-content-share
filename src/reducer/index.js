const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
        loading: true,
      };

    case "SET_MEETING_INFO":
      return {
        ...state,
        meetingResponse: action.payload,
        loading: false,
      };
    case "SET_ERROR":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
    default:
      return state;
  }
};

export default Reducer;
