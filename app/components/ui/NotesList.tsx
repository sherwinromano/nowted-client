import Link from "next/link";
import { NotesListProps, NoteCardProps } from "@/app/types";

const NotesList = ({ title, category, notes, className }: NotesListProps) => {
  return (
    <section className={className}>
      <h2 className="text-primary font-semibold text-xl">{title}</h2>
      <ul className="flex flex-col gap-4 overflow-auto scrollbar-hide">
        {!notes.length && (
          <h6 className="font-semibold text-primary">Empty notes</h6>
        )}
        <NoteCard category={category} notes={notes} />
      </ul>
    </section>
  );
};

const NoteCard = ({ notes, category }: NoteCardProps) => {
  return notes.map((note) => {
    const text = note.description;
    const shortText = text.length > 10 ? text.slice(0, 15) + "..." : text;

    return (
      <li className="bg-[#232323] flex rounded-sm" key={note.title}>
        <Link
          href={`/${category}/${note.id}`}
          className="p-4 flex flex-col gap-2.5 basis-full"
        >
          <h3 className="text-primary font-semibold text-lg leading-[24px]">
            {note.title}
          </h3>
          <div className="flex items-center gap-2.5">
            <span className="text-tertiary">{note.date}</span>
            <p className="text-secondary">{shortText}</p>
          </div>
        </Link>
      </li>
    );
  });
};

export default NotesList;
