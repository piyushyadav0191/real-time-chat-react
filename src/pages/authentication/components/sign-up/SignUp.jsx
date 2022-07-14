import { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";

import { InputForm, TwButton } from "/src/common/components";
import { useLocalStorage, useAuth } from "../../hooks";

const SignUp = ({ setPendingMsg, setIsSigningIn, pendingMsg }) => {
  const [errorMsg, setErrorMsg] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  const confirmPassRef = useRef();

  const { signUpUser } = useAuth(setPendingMsg, setErrorMsg);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();

      const confirmPass = confirmPassRef.current;

      if (confirmPass.value !== userPass) {
        throw new Error("Passwords doesn't match.");
      }

      signUpUser(userEmail, userName, userPass);
    } catch (error) {
      setErrorMsg(error.message);
      setPendingMsg("");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      {" "}
      <div className="flex flex-col gap-1">
        <label className="text-2xl font-semibold text-left text-center text-black dark:text-white">
          Sign up
        </label>
        <label className="text-sm text-muted-light dark:text-muted-dark text-center mb-4">
          Fill in the form
        </label>
      </div>
      {errorMsg && (
        <p className="text-red-600 text-md text-center">{errorMsg}</p>
      )}
      <InputForm
        label="Email"
        type="email"
        placeHolder="e.g example@email.com"
        isControlled="true"
        invalidLabel="Please provide a valid Email Address"
        state={userEmail}
        setState={setUserEmail}
      />
      <InputForm
        label="Username"
        type="text"
        placeHolder="e.g example123"
        minLength="6"
        invalidLabel="Please use at least 6 characters for the username."
        isControlled="true"
        state={userName}
        setState={setUserName}
      />
      <InputForm
        label="Password"
        type="password"
        placeHolder="*********"
        minLength="8"
        invalidLabel="Please use at least 8 characters for the password."
        isControlled="true"
        state={userPass}
        setState={setUserPass}
      />
      <InputForm
        label="Confirm Password"
        type="password"
        placeHolder="*********"
        inputRef={confirmPassRef}
        minLength="8"
        invalidLabel=""
      />
      <TwButton isDisabled={pendingMsg}>Sign Up</TwButton>
      <p className="text-muted-light dark:text-muted-dark text-sm">
        Already have an account?{" "}
        <a
          onClick={() => setIsSigningIn(true)}
          className="text-primary-main cursor-pointer hover:text-primary-tinted duration-300 font-semibold"
        >
          Login
        </a>
      </p>
    </form>
  );
};

export default SignUp;