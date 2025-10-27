import NotesList from "../components/ui/NotesList";

const TrashLayout = async ({ children }: { children: React.ReactNode }) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trash`, {
    cache: "no-store",
  });
  const notes = await req.json();

  return (
    <section className="flex basis-full">
      <NotesList title="Trash" category="trash" notes={notes} />
      {children}
    </section>
  );
};

export default TrashLayout;
