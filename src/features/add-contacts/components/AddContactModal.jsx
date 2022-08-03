import { useState } from "react";
import { TwTrnButton, TwButton } from "/src/components";

const AddContactModal = ({ setShowModal, otherUser }) => {
  const cancelBtnHandler = () => setShowModal(false);

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col items-center text-center px-8">
        <img
          className="bg-cover bg-center bg-transparent mb-2 w-16 h-16 rounded-full shadow-md"
          alt={`${otherUser.username}'s profile picture`}
          src={otherUser.profile}
        />
        <h2 className="text-lg text-black dark:text-white">
          {otherUser.username}
        </h2>
        <p className="text-muted-light dark:text-muted-dark">
          Front-end Developer
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <TwButton addClass="w-full flex justify-center py-1">
          Add Contact
        </TwButton>
        <TwTrnButton
          clickHandler={cancelBtnHandler}
          addClass="w-full flex justify-center border border-muted-light/50 dark:border-muted-dark/50 py-1"
        >
          Cancel
        </TwTrnButton>
      </div>
    </div>
  );
};

export default AddContactModal;
