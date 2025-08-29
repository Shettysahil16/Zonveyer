import React from "react";
import Left from "../left/Left";
import Right from "../right/Right";
import useConversation from "../state_manage/useConversation";
import FirstLeft from "../first-Left/firstLeft";

function Home() {
  const { selectedConversation } = useConversation();

  return (
    <div className="h-screen w-full flex">
      {/* Left Panel */}
      <div
        className={`
          ${selectedConversation ? "hidden" : "flex"}
          sm:flex 
          w-full md:w-[90vw] lg:w-[60vw] xl:w-[35vw]
          h-full
        `}
      >
        <FirstLeft />
        <Left />
      </div>

      {/* Right Panel */}
      <div
        className={`
          ${selectedConversation ? "flex" : "hidden"}
          sm:flex 
          w-full 
          h-full
        `}
      >
        <Right />
      </div>
    </div>
  );
}

export default Home;
