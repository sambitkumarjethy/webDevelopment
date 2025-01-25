import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase.js";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(true);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignupForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  const HandleButtonClick = () => {
    // determine the name value based on the form type
    const nameValue = !isSignInForm ? name.current.value : null;
    // validate the form data
    const message = checkValidData(
      nameValue,
      email.current.value,
      password.current.value,
      isSignInForm
    );
    setErrorMsg(message);
    if (message) return;
    // sign IN sign up
    if (!isSignInForm) {
      // sign UP Login
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    } else {
      //sign In Logic
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg"
          alt=""
          aria-hidden="true"
          className="default-ltr-cache-19j6xtr"
        ></img>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4 ">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 bg-opacity-30"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-30"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 bg-opacity-30"
        />
        <p className="text-red-500 font-bold text-lg">{errorMsg}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={HandleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 cursor-pointer hover:text-red-600"
          onClick={toggleSignupForm}
        >
          {isSignInForm
            ? "  New to Netflix ? Signup Now"
            : "Already registed ? SignIn Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
