import NotesList from "../components/ui/NotesList";

const WorkLayout = async ({ children }: { children: React.ReactNode }) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/work`, {
    cache: "no-store",
  });
  const notes = await req.json();

  return (
    <section className="flex basis-full">
      <NotesList title="Work" category="work" notes={notes} />
      {children}
    </section>
  );
};

export default WorkLayout;
