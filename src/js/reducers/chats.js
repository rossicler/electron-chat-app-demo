const DEFAULT_STATE = {
  joinedChats: [],
  availableChats: [],
};

const chatsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "CHATS_FETCH_RESTART":
      return {
        joinedChats: [],
        availableChats: [],
      };
    case "CHATS_FETCH_SUCCESS":
      return {
        joinedChats: action.joined,
        availableChats: action.available,
      };
    default: {
      return state;
    }
  }
};

export default chatsReducer;
