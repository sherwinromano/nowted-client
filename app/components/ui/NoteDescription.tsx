"use client";

import { useState } from "react";
import Dropdown, { useDropdown } from "./Dropdown";
import Toolbar from "./Toolbar";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EditButtonProps, FontSizeDropdownProps } from "@/app/types";
import { getFontSizeClass } from "@/app/utils";
import { useSession } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { Spinner } from "./spinner";

const NoteDescription = ({ note }: { note: string }) => {
  const fontSizes = ["XS", "S", "M", "L", "XL"];
  const [fontSize, setFontSize] = useState("M");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(note);
  const pathname = usePathname();

  // ?? Dynamic folder and id for handling data mutation
  const segments = pathname.split("/").filter(Boolean);
  const [folder, id] = segments;

  return (
    <div className="flex flex-col xs:gap-4 lg:gap-7 h-full">
      {!pathname.includes("trash") && !pathname.includes("archived") && (
        <div className="flex justify-end gap-8 xs:w-full lg:w-fit">
          <Dropdown
            label={fontSize}
            borderColor="border-[#2f2f2f]"
            width="w-[5rem]"
          >
            <FontSizeDropdown fontSizes={fontSizes} setFontSize={setFontSize} />
          </Dropdown>

          <Toolbar
            onToggleBold={() => setIsBold((prev) => !prev)}
            onToggleItalic={() => setIsItalic((prev) => !prev)}
            onToggleUnderline={() => setIsUnderline((prev) => !prev)}
          />
          <EditButtons
            editMode={editMode}
            setEditMode={setEditMode}
            updatedNote={updatedNote}
            folder={folder}
            id={id}
          />
        </div>
      )}

      <div className="flex h-full">
        {editMode ? (
          <textarea
            name="description"
            id="description"
            className="resize-none text-primary text-base w-full outline-none"
            value={updatedNote}
            onChange={(e) => setUpdatedNote(e.target.value)}
          ></textarea>
        ) : (
          <p
            className={clsx(
              "text-primary leading-[28px] xs:text-base h-fit",
              getFontSizeClass(fontSize),
              {
                "font-bold": isBold,
                italic: isItalic,
                underline: isUnderline,
              }
            )}
          >
            {updatedNote}
          </p>
        )}
      </div>
    </div>
  );
};

const EditButtons = ({
  editMode,
  setEditMode,
  folder,
  id,
  updatedNote,
}: EditButtonProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/${folder}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-email": session?.user?.email || "",
          },
          body: JSON.stringify({ description: updatedNote }),
        }
      );

      if (!res.ok) throw new Error("Failed to update note");
      setEditMode(false);

      window.dispatchEvent(new Event("refreshNotes"));
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return editMode ? (
    <form action={handleUpdate}>
      <SaveButton />
    </form>
  ) : (
    <button
      className="border flex items-center gap-3 px-4 py-2 border-[#2f2f2f] rounded-sm cursor-pointer"
      onClick={() => setEditMode(true)}
    >
      <Image src={"/pencil.svg"} alt="Pencil icon" height={15} width={15} />
      <span className="text-primary text-sm">Edit</span>
    </button>
  );
};

const FontSizeDropdown = ({
  fontSizes,
  setFontSize,
}: FontSizeDropdownProps) => {
  const { setIsOpenedDropdown } = useDropdown();
  return (
    <ul className="absolute bg-primary w-full top-full border border-[#2f2f2f] rounded-sm mt-2">
      {fontSizes.map((item) => {
        return (
          <li
            className="font-semibold text-sm text-primary p-1 cursor-pointer text-center hover:bg-[#1f1f1f]"
            key={item}
            onClick={() => {
              setFontSize(item);
              setIsOpenedDropdown(false);
            }}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

const SaveButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="border flex items-center gap-3 px-4 py-2 border-[#2f2f2f] rounded-sm cursor-pointer">
      {pending ? (
        <Spinner className="text-primary size-5" />
      ) : (
        <Image src={"/save.svg"} alt="Save icon" height={20} width={20} />
      )}
      <span className="text-primary text-sm">
        {pending ? "Saving" : "Save"}
      </span>
    </button>
  );
};

export default NoteDescription;
