import { LayoutProps } from "@/app/types";
import NotesList from "../ui/NotesList";

const DesktopLayout = ({ title, category, notes, children }: LayoutProps) => {
  return (
    <section className="xs:hidden lg:flex basis-full">
      <NotesList
        title={title}
        category={category}
        notes={notes}
        className="flex bg-secondary h-full basis-[40%] py-7 px-5 flex-col gap-7"
      />
      {children}
    </section>
  );
};

export default DesktopLayout;
