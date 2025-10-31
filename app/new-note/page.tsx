"use client";

import { useSession } from "next-auth/react";
import { createNote } from "../actions";
import SubmitButton from "../components/ui/SubmitButton";

const NewNote = () => {
  const { data: session } = useSession();

  return (
    <section className="bg-secondary basis-full grid place-items-center">
      <form
        action={async (formData) => {
          await createNote({
            formData,
            email: session?.user?.email || "",
          });
        }}
        className="flex flex-col gap-4 text-primary xs:w-[80%] md:w-[60%] lg:w-1/2 h-fit bg-[#333333] border border-[#747474] xs:p-[1.50rem] sm:p-[2rem] lg:p-[2.25rem] rounded-[16px]"
      >
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          className="border-b border-[#747474] outline-none text-base pb-1"
          type="text"
          name="title"
          id="title"
          required
        />
        <label htmlFor="description" className="font-semibold">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="border-b border-[#747474] outline-none xs:h-[5rem] lg:h-[8rem] text-base resize-none"
          rows={5}
          required
        ></textarea>
        <div className="flex flex-col gap-2">
          <label htmlFor="folder" className="font-semibold">
            Folder
          </label>
          <select
            name="folder"
            id="folder"
            className="bg-[#333333] border border-[#747474] p-2 rounded-lg"
            required
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>
        <SubmitButton />
      </form>
    </section>
  );
};

export default NewNote;
