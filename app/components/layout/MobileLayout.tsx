"use client";

import { LayoutProps } from "@/app/types";
import MobileHeader from "../ui/MobileHeader";
import NotesList from "../ui/NotesList";
import { usePathname } from "next/navigation";

const MobileLayout = ({ title, category, notes, children }: LayoutProps) => {
  const pathname = usePathname() ?? "";
  const segments = pathname.split("/").filter(Boolean);

  // hide list when route is /{category}/{id}
  const opened_dynamic_route = segments[0] === category && segments.length > 1;

  return (
    <section className="xs:flex flex-col xs:p-5 md:p-7 lg:hidden basis-full gap-7">
      <MobileHeader />
      {!opened_dynamic_route && (
        <NotesList
          title={title}
          category={category}
          notes={notes}
          className="flex flex-col h-full basis-full gap-4"
        />
      )}
      {children}
    </section>
  );
};

export default MobileLayout;
