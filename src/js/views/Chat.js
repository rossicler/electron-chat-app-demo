import React, { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import ViewTitle from "../components/shared/ViewTitle";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import { withBaseLayout } from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToChat, subscribeToProfile } from "../actions/chats";
import LoadingView from "../components/shared/LoadingView";

const Chat = () => {
  const { id } = useParams();
  const peopleWatchers = useRef({});
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.chats.activeChats[id]);
  const joinedUsers = activeChat?.joinedUsers;

  const subscibeToJoinedUsers = useCallback(
    (jUsers) => {
      jUsers.forEach((user) => {
        const unsub = dispatch(subscribeToProfile(user.uid, id));
        if (!peopleWatchers.current[user.uid] && unsub) {
          peopleWatchers.current[user.uid] = unsub;
        }
      });
    },
    [dispatch, id]
  );

  const unsubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  }, [peopleWatchers.current]);

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));

    return () => {
      unsubFromChat();
    };
  }, []);

  useEffect(() => {
    if (joinedUsers) subscibeToJoinedUsers(joinedUsers);

    return () => {
      unsubFromJoinedUsers();
    };
  }, [joinedUsers]);

  if (!activeChat?.id) {
    return <LoadingView message="Loading Chat..." />;
  }

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Channel: ${activeChat?.name}`} />
        <ChatMessagesList />
      </div>
    </div>
  );
};

export default withBaseLayout(Chat, { canGoBack: true });
