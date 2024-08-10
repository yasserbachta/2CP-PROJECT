import React from "react";
import { Header } from "../../layout";
import Inbox from "./Inbox";
import Messages from "./Messages";
const Chat = () => {
  return (
    <div className="font-poppins m-[15px] h-[105vh] sm:m-[30px] flex flex-col gap-5 sm:gap-9">
      <Header title={"Chat"} />
      <div className="relative flex  rounded-xl bg-white justify-center  overflow-hidden select-none gap-0 h-screen ">
        <Inbox />
        <div className="flex-1">
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default Chat;
