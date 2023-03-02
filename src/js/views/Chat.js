import React from "react";
import { useParams } from "react-router-dom";

import ViewTitle from "../components/shared/ViewTitle";
import ChatUsersList from "../components/ChatUsersList";
import ChatMessagesList from "../components/ChatMessagesList";
import { withBaseLayout } from "../layouts/Base";

const Chat = () => {
  const params = useParams();

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined channel: ${params?.id}`} />
        <ChatMessagesList />
      </div>
    </div>
  );
};

export default withBaseLayout(Chat, { canGoBack: true });
