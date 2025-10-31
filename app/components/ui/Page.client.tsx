"use client";

import MenuDropdown from "@/app/components/ui/MenuDropdown";
import MenuDropdownChildren from "@/app/components/ui/MenuDropdownChildren";
import NoteDescription from "@/app/components/ui/NoteDescription";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type DropdownChildren = {
  label: string;
  image: {
    src: string;
    alt: string;
  };
  action: string;
  method: string;
  path: string;
};

type PageProps = {
  title: string;
  id: string;
  category: string;
  dropdown_children: DropdownChildren[];
};

const Page = ({ title, id, category, dropdown_children }: PageProps) => {
  const { data: session, status } = useSession();
  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchNote = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/${category}/${id}`,
          {
            headers: {
              "x-user-email": session?.user?.email || "",
            },
          }
        );

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Error: ${res.status}`);
        }

        const data = await res.json();
        setNote(data);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchNote();
  }, [id, session, status]);

  return (
    <section className="basis-full xs:p-0 lg:p-7 flex flex-col gap-7">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">
          {note && note.title}
        </h1>
        <MenuDropdown>
          <MenuDropdownChildren dropdown_children={dropdown_children} />
        </MenuDropdown>
      </div>

      <div className="flex flex-col">
        <div className="flex xs:justify-between md:justify-normal pb-3.5">
          <div className="flex items-center gap-3.5 basis-[20%]">
            <Image
              src={"/calendar.svg"}
              alt="Calendar icon"
              width={20}
              height={20}
            />
            <span className="font-semibold text-sm text-secondary">Date</span>
          </div>
          <p className="font-semibold underline text-primary text-sm">
            {note && note.date}
          </p>
        </div>

        <div className="flex py-3.5 xs:justify-between md:justify-normal border-y-2 border-[#2f2f2f]">
          <div className="flex items-center gap-3.5 basis-[20%]">
            <Image
              src={"/folder-closed.svg"}
              alt="Folder icon"
              width={20}
              height={20}
            />
            <span className="font-semibold text-sm text-secondary">Folder</span>
          </div>
          <p className="font-semibold underline text-primary text-sm">
            {title}
          </p>
        </div>
      </div>
      {note && <NoteDescription note={note.description} />}
    </section>
  );
};

export default Page;
