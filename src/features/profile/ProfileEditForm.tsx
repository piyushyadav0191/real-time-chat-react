import React, { useEffect, useState } from "react";
import { TwButton, InputForm } from "components";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

interface ProfileEditFormProps {
  email: string;
  setShowModal: (state: boolean) => void;
}

const ProfileEditForm = ({ email, setShowModal }: ProfileEditFormProps) => {
  const [username, setUsername] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pendingMsg, setPendingMsg] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState("");

  const handleChangeInfo = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!validUsername) return;

      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    console.log(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    // setErrorMsg("");
  }, [username, password]);

  return (
    <form onSubmit={handleChangeInfo} className="flex flex-col gap-2 w-64">
      <h2 className="text-black dark:text-white text-xl text-center">
        Edit Information
      </h2>
      <p
        className={`text-red-600 text-md text-center ${
          errorMsg ? "visible block" : "absolute invisible"
        }`}
      >
        {errorMsg}
      </p>

      <InputForm
        label="Username"
        type="text"
        isSmall={true}
        state={username}
        setState={setUsername}
        stateFocus={usernameFocus}
        setStateFocus={setUsernameFocus}
        placeholder="e.g example123"
        isValid={validUsername}
        instruction="Must be 4 to 24 characters and begins with a letter. Hyphen and underscore are allowed"
      />
      <InputForm
        label="Current Password"
        type="password"
        isSmall={true}
        state={password}
        setState={setPassword}
        placeholder="*********"
      />
      <TwButton
        disabled={validUsername && !pendingMsg ? false : true}
        className="mt-2"
      >
        {pendingMsg ? pendingMsg : "Save"}
      </TwButton>
    </form>
  );
};

export default ProfileEditForm;