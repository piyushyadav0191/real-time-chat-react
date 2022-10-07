import React, { useEffect, useState } from "react";
import { TwButton, InputForm } from "components";
import { editProfile } from "features/authentication/userSlice";
import { useAppDispatch } from "app/hooks";
import { User } from "interfaces";

const USER_REGEX = /^[A-z][A-z0-9-_ ]{2,17}$/;

interface ProfileEditFormProps {
  currentUserInfo: User;
  setShowModal: (state: boolean) => void;
}

const ProfileEditForm = ({
  currentUserInfo,
  setShowModal,
}: ProfileEditFormProps) => {
  const [displayName, setDisplayName] = useState(currentUserInfo.displayName);
  const [validDisplayName, setValidDisplayName] = useState(false);
  const [displayNameFocus, setDisplayNameFocus] = useState(false);

  const [bio, setBio] = useState(currentUserInfo.bio);
  const [location, setLocation] = useState(currentUserInfo.location);

  const [errorMsg, setErrorMsg] = useState("");
  const [pendingMsg, setPendingMsg] = useState("");

  const dispatch = useAppDispatch();

  const handleChangeInfo = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!validDisplayName) return;

      await dispatch(editProfile({ displayName, bio, location }));
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValidDisplayName(USER_REGEX.test(displayName));
  }, [displayName]);

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
        label="Display Name"
        type="text"
        isSmall={true}
        state={displayName}
        setState={setDisplayName}
        stateFocus={displayNameFocus}
        setStateFocus={setDisplayNameFocus}
        placeholder="e.g example123"
        isValid={validDisplayName}
        instruction="3-18 Characters. Hyphen, Spaces and underscore are allowed"
      />
      <InputForm
        label="Bio"
        type="text"
        isSmall={true}
        state={bio}
        setState={setBio}
        placeholder="e.g Developer"
        maxLength={30}
      />
      <InputForm
        label="Location"
        type="text"
        isSmall={true}
        state={location}
        setState={setLocation}
        placeholder="e.g Earth"
        maxLength={30}
      />
      <TwButton
        disabled={validDisplayName && bio && !pendingMsg ? false : true}
        className="mt-2"
        type="submit"
      >
        {pendingMsg ? pendingMsg : "Save"}
      </TwButton>
    </form>
  );
};

export default ProfileEditForm;
