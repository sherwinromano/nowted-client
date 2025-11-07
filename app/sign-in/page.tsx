"use client";

import Image from "next/image";
import { signInWithGithub, signInWithGoogle } from "../actions";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { Spinner } from "../components/ui/spinner";

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
    <div className="flex flex-col gap-4 w-full">
      {signInButtons.map((item) => (
        <form action={item.action} key={item.label} className="w-full">
          <SignInButton icon={item.icon} label={item.label} />
        </form>
      ))}
    </div>
  );
};

const SignInButton = ({ icon, label }: { icon: string; label: string }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "flex justify-center items-center gap-4 bg-secondary py-3 px-4 rounded-full border border-[#2f2f2f] transition-all w-full cursor-pointer",
        pending ? "opacity-70 cursor-not-allowed" : ""
      )}
    >
      {pending ? (
        <Spinner className="text-primary size-4" />
      ) : (
        <Image src={icon} alt={`${label} icon`} width={25} height={25} />
      )}
      <p className="xs:text-sm sm:text-base font-semibold text-primary">
        {pending ? `Signing in` : label}
      </p>
    </button>
  );
};

export default SignIn;
