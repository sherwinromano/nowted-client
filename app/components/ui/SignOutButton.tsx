import { useFormStatus } from "react-dom";
import Image from "next/image";
import { Spinner } from "./spinner";

const SignOutButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className="flex items-center justify-center gap-2 bg-red-500 py-2 px-4 rounded-md cursor-pointer"
      disabled={pending}
    >
      {pending ? (
        <Spinner className="text-primary size-6" />
      ) : (
        <Image
          src={"/arrow-left-start.svg"}
          alt="Arrow left start icon"
          width={24}
          height={24}
        />
      )}
      <span className="text-sm text-primary font-medium">
        {pending ? "Loading" : "Sign Out"}
      </span>
    </button>
  );
};

export default SignOutButton;
