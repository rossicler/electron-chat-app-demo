import { combineReducers, createReducer } from "@reduxjs/toolkit";

const chatsReducer = () => {
  const joinedChats = (state = [], action) => {
    switch (action.type) {
      case "CHATS_FETCH_RESTART":
        return [];
      case "CHATS_FETCH_SUCCESS":
        return action.joined;
      case "CHATS_JOIN_SUCCESS":
        return [...state.joinedChats, action.chat];
      default: {
        return state;
      }
    }
  };

  const availableChats = (state = [], action) => {
    switch (action.type) {
      case "CHATS_FETCH_RESTART":
        return [];
      case "CHATS_FETCH_SUCCESS":
        return action.available;
      case "CHATS_JOIN_SUCCESS":
        return state.availableChats.filter(
          (chat) => chat.id !== action.chat.id
        );
      default: {
        return state;
      }
    }
  };

  const activeChats = createReducer(
    {},
    {
      CHATS_SET_ACTIVE_CHAT: (state, action) => {
        const { chat } = action;
        state[chat.id] = chat;
      },
      CHATS_UPDATE_USER_STATE: (state, action) => {
        const { user, chatId } = action;
        const joinedUsers = state[chatId].joinedUsers;
        const index = joinedUsers.findIndex((ju) => ju.uid === user.uid);

        if (index < 0 || joinedUsers[index].state === user.state) {
          return state;
        }

        joinedUsers[index].state = user.state;
      },
    }
  );

  return combineReducers({
    joinedChats,
    availableChats,
    activeChats,
  });
};

export default chatsReducer();
