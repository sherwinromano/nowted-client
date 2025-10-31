"use client";

import Image from "next/image";
import { signInWithGithub, signInWithGoogle } from "../actions";

type SignInButtonProps = {
  icon: string;
  label: string;
  action?: () => Promise<void>;
};

type SignInButtonProp = {
  signInButtons: SignInButtonProps[];
};

const SignIn = () => {
  const signInButtons = [
    {
      icon: "/google.svg",
      label: "Sign in with Google",
      action: signInWithGoogle,
    },
    {
      icon: "/github.svg",
      label: "Sign in with Github",
      action: signInWithGithub,
    },
  ];

  return (
    <section className="grid place-items-center w-full">
      <div className="flex flex-col items-center gap-8 xs:w-[80%] md:w-[60%] lg:w-[30%]">
        <Image src={"/logo.svg"} alt="Nowted logo" width={150} height={150} />
        <SignInButtons signInButtons={signInButtons} />
      </div>
    </section>
  );
};

const SignInButtons = ({ signInButtons }: SignInButtonProp) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {signInButtons.map((item) => {
        return (
          <button
            className="flex justify-center items-center gap-4 bg-secondary py-3 px-4 rounded-full cursor-pointer border border-[#2f2f2f]"
            key={item.label}
            onClick={() => item.action?.()}
          >
            <Image
              src={item.icon}
              alt="Sign button icon"
              width={item.label === "Github" ? 30 : 25}
              height={item.label === "Github" ? 50 : 25}
            />
            <p className="xs:text-sm sm:text-base font-semibold text-primary">
              {item.label}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default SignIn;
