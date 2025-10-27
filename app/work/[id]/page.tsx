import MenuDropdown from "@/app/components/ui/MenuDropdown";
import MenuDropdownChildren from "@/app/components/ui/MenuDropdownChildren";
import NoteDescription from "@/app/components/ui/NoteDescription";
import { URLAction } from "@/app/utils";
import Image from "next/image";

const WorkNote = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/work/${id}`, {
    cache: "no-store",
  });
  const note = await res.json();

  const dropdown_children = [
    {
      label: "Add to favorites",
      image: {
        src: "/star.svg",
        alt: "Star icon",
      },
      action: URLAction("work", "favorites", id),
      method: "POST",
      path: "/favorites",
    },
    {
      label: "Archived",
      image: {
        src: "/doc-box.svg",
        alt: "Doc box icon",
      },
      action: URLAction("work", "archived", id),
      method: "POST",
      path: "/archived-notes",
    },
    {
      label: "Trash",
      image: {
        src: "/trash-bin.svg",
        alt: "Trash bin icon",
      },
      action: URLAction("work", "trash", id),
      method: "DELETE",
      path: "/trash",
    },
  ];

  return (
    <section className="basis-full p-7 flex flex-col gap-7">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">{note.title}</h1>
        <MenuDropdown
          children={
            <MenuDropdownChildren dropdown_children={dropdown_children} />
          }
        />
      </div>
      <div className="flex flex-col">
        <div className="flex pb-3.5">
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
            {note.date}
          </p>
        </div>
        <div className="flex py-3.5 border-y-2 border-[#2f2f2f]">
          <div className="flex items-center gap-3.5 basis-[20%]">
            <Image
              src={"/folder-closed.svg"}
              alt="Folder icon"
              width={20}
              height={20}
            />
            <span className="font-semibold text-sm text-secondary">Folder</span>
          </div>
          <p className="font-semibold underline text-primary text-sm">Work</p>
        </div>
      </div>
      <NoteDescription note={note.description} />
    </section>
  );
};

export default WorkNote;
