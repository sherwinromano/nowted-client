"use client";

import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { Spinner } from "@/app/components/ui/spinner";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "bg-black cursor-pointer text-sm text-white py-3 rounded-lg xs:mt-5 lg:mt-3",
        pending &&
          "opacity-50 cursor-not-allowed flex items-center gap-2 justify-center"
      )}
    >
      {pending ? (
        <>
          <Spinner className="text-white size-4" />
          <span>Adding note</span>
        </>
      ) : (
        "Add Note"
      )}
    </button>
  );
};

export default SubmitButton;
