import FontSizeSelector from "@/app/components/ui/FontSizeSelector";
import NoteDescription from "@/app/components/ui/NoteDescription";
import Toolbar from "@/app/components/ui/Toolbar";
import Image from "next/image";

const PersonalNote = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`${process.env.BASE_URL}/api/personal/${params.id}`, {
    cache: "no-store",
  });
  const note = await res.json();

  return (
    <section className="basis-full p-7 flex flex-col gap-7">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">{note.title}</h1>
        <button className="grid place-items-center border border-[#747474] rounded-full p-1 cursor-pointer">
          <Image
            src={"/ellipsis-horizontal.svg"}
            alt="Ellipsis icon"
            width={24}
            height={24}
          />
        </button>
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
          <p className="font-semibold underline text-primary text-sm">
            Personal
          </p>
        </div>
      </div>
      <NoteDescription note={note.description} />
    </section>
  );
};

export default PersonalNote;
