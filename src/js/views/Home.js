import React, { useEffect } from "react";

import JoinedChatsList from "../components/JoinedChatsList";
import AvailableChatsList from "../components/AvailableChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import { fetchChats } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";
import { withBaseLayout } from "../layouts/Base";
import Notification from "../utils/notifications";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const joinedChats = useSelector((state) => state.chats.joinedChats);
  const availableChats = useSelector((state) => state.chats.availableChats);

  useEffect(() => {
    Notification.setup();
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={joinedChats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose your channel">
          <Link className="btn btn-outline-primary" to="/chatCreate">
            New
          </Link>
        </ViewTitle>
        <AvailableChatsList chats={availableChats} />
      </div>
    </div>
  );
};

export default withBaseLayout(Home);
