import { ProfilePicture, TwButton } from "components";
import React, { useEffect, useState } from "react";
import { User } from "interfaces";
import { getChatState } from "./chatReducer";
import { useAppSelector } from "hooks";
import { useFormatDate, useGetUser, useGetUserStatus } from "hooks";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "setup/firebase";

interface ChatListProps {
  chat: any;
  chatClickHandler: (recipient: User, isGroup: boolean) => void;
}

const ChatList = ({ chat, chatClickHandler }: ChatListProps): JSX.Element => {
  const [recipient, setRecipient] = useState<User | any>();
  const [isGroup, setIsGroup] = useState(false);
  const [lastMsgDate, setLastMsgDate] = useState("");

  const { chatId } = useAppSelector(getChatState);

  const online = !chat[1].isGroup && useGetUserStatus(chat[1].userInfo.uid);

  const formatDate = useFormatDate();
  const getUserInfo = useGetUser();

  const chatListClickHandler = () => {
    if (isGroup) {
      const groupData = {
        groupName: recipient.groupName,
        groupID: recipient.groupID,
        photoURL: recipient.photoURL,
      };

      chatClickHandler(groupData, isGroup);
      return;
    }

    chatClickHandler(recipient as User, isGroup);
  };

  useEffect(() => {
    let unsub: any = null;

    if (chat[1].isGroup) {
      const groupChatDoc = doc(db, "groupChats", chat[1].groupID);
      unsub = onSnapshot(groupChatDoc, (doc) => {
        const groupChatData = doc.data();

        console.log(groupChatData);
        if (!groupChatData) return;

        const date = formatDate(groupChatData.lastMessage.date.toDate());
        setLastMsgDate(date as string);
        setRecipient(doc.data());
      });

      return setIsGroup(true);
    }

    setIsGroup(false);

    const recipientUID = chat[1].userInfo.uid;
    getUserInfo(recipientUID).then((recipientInfo) => {
      const date = formatDate(chat[1].lastMessage.date.toDate());
      setLastMsgDate(date as string);
      setRecipient(recipientInfo);
    });

    return () => {
      unsub?.();
    };
  }, []);

  return (
    <TwButton
      variant="transparent"
      onClick={chatListClickHandler}
      className={`w-full p-2 ${
        chat[1].unread && "bg-muted-light/5 dark:bg-muted-dark/10"
      }  ${chat[0] === chatId && "bg-muted-light/10 dark:bg-muted-dark/20"}
     `}
    >
      <ProfilePicture
        photoURL={recipient?.photoURL}
        isOnline={online}
        size="medium"
      />
      <div className="flex flex-col items-start">
        <h2 className="text-xl text-black dark:text-white">
          {isGroup ? recipient?.groupName : recipient?.displayName}
        </h2>
        <div
          className={` flex gap-1 ${
            chat[1].unread
              ? "font-bold dark:text-white"
              : "dark:text-muted-dark"
          } text-sm text-muted-light `}
        >
          <p className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[10rem]">
            {isGroup
              ? recipient?.lastMessage?.message
              : chat[1].lastMessage?.message}
          </p>
          <span>•</span>
          <time className="">{lastMsgDate}</time>
        </div>
      </div>

      {chat[1].unread && (
        <div className="flex flex-col gap-1 items-end ml-auto ">
          <div className="w-5 p-0.5 text-center text-white bg-primary-main rounded-full">
            <p className="text-xs">{chat[1].unreadMsgCount}</p>
          </div>
        </div>
      )}
    </TwButton>
  );
};

export default ChatList;
