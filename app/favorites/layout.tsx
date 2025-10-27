import NotesList from "../components/ui/NotesList";

const FavoritesLayout = async ({ children }: { children: React.ReactNode }) => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, {
    cache: "no-store",
  });
  const notes = await req.json();

  return (
    <section className="flex basis-full">
      <NotesList title="Favorites" category="favorites" notes={notes} />
      {children}
    </section>
  );
};

export default FavoritesLayout;
