import NotesList from "../components/ui/NotesList";

const ArchivedLayout = async ({ children }: { children: React.ReactNode }) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/archived`, {
    cache: "no-store",
  });
  const notes = await req.json();

  return (
    <section className="flex basis-full">
      <NotesList
        title="Archived notes"
        category="archived-notes"
        notes={notes}
      />
      {children}
    </section>
  );
};

export default ArchivedLayout;
