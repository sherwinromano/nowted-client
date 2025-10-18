import NotesList from "../components/ui/NotesList";

const PersonalLayout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetch(`${process.env.BASE_URL}/api/personal`, {
    cache: "no-store",
  });
  const notes = await res.json();

  return (
    <section className="flex basis-full">
      <NotesList title="Personal" category="personal" notes={notes} />
      {children}
    </section>
  );
};

export default PersonalLayout;
