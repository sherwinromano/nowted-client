import Link from "next/link";

type NotesListProps = {
  title: string;
  category: string;
  notes: {
    id: number;
    title: string;
    date: string;
    description: string;
  }[];
};

const NotesList = ({ title, category, notes }: NotesListProps) => {
  return (
    <section className="bg-secondary h-full basis-[40%] py-7 px-5 flex flex-col gap-7">
      <h2 className="text-primary font-semibold text-xl">{title}</h2>
      <ul className="flex flex-col gap-4">
        {notes.map((note) => {
          const text = note.description;
          const shortText =
            text.length > 10 ? text.slice(0, 15) + "..." : text.length;

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
        })}
      </ul>
    </section>
  );
};

export default NotesList;
