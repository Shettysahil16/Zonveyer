function Chats({ message, prevMessage }) {
  const createdAt = new Date(message?.createdAt);
  const messageTime = createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const senderUserInfo = JSON.parse(localStorage.getItem("messenger"));
  const senderUserId = senderUserInfo?._id;
  const isUserSender = senderUserId === message?.senderId;

  function conversationDate(dateString) {
    if (!dateString) return "";
    const messageDate = new Date(dateString);
    const now = new Date();

    const isSameDay = messageDate.toDateString() === now.toDateString();
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isSameDay) return "Today";
    if (isYesterday) return "Yesterday";

    const day = String(messageDate.getDate()).padStart(2, "0");
    const month = String(messageDate.getMonth() + 1).padStart(2, "0");
    const year = messageDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // ✅ Show date only when it's different from previous message
  const showDate =
    !prevMessage ||
    new Date(prevMessage.createdAt).toDateString() !==
      new Date(message.createdAt).toDateString();

  return (
    <div className="py-2 px-1">
      {showDate && (
        <p className="text-xs py-2 px-4 text-center bg-black w-fit mx-auto rounded-md shadow-md">
          {conversationDate(message?.createdAt)}
        </p>
      )}

      <div className={`chat ${isUserSender ? "chat-end" : "chat-start"}`}>
        <div
          className={`chat-bubble relative max-w-[80%] ${
            isUserSender ? "chat-bubble-accent" : "chat-bubble-info"
          }`}
        >
          <div className="break-words whitespace-pre-wrap text-sm pr-12">
            {message?.message}
          </div>
          <div className="absolute bottom-1 right-2 text-[10px] text-gray-600">
            {messageTime}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
