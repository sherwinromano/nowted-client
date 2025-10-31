"use client";

import { LayoutProps, Note } from "@/app/types";
import MobileHeader from "../ui/MobileHeader";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { SessionContextValue, useSession } from "next-auth/react";
import NotesList from "../ui/NotesList";
import DesktopLoader from "../ui/Loader";
import { DragEndEvent } from "@dnd-kit/core";

const MobileLayout = ({ title, category, children }: LayoutProps) => {
  const pathname = usePathname() ?? "";
  const segments = pathname.split("/").filter(Boolean);
  const [notes, setNotes] = useState<Note[]>([]);
  const { data: session, status }: SessionContextValue = useSession();

  // hide list when route is /{category}/{id}
  const opened_dynamic_route = segments[0] === category && segments.length > 1;

  const fetchNotes = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/${category}`,
        {
          cache: "no-store",
          headers: { "x-user-email": session.user.email },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch notes");

      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  }, [session?.user?.email, category]);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setNotes((prevNotes) => {
        const updated = [...prevNotes];
        const oldIndex = updated.findIndex((n) => n.id === active.id);
        const newIndex = updated.findIndex((n) => n.id === over.id);

        const [moved] = updated.splice(oldIndex, 1);
        updated.splice(newIndex, 0, moved);

        // Update server order
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${category}/reorder`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-user-email": session?.user?.email || "",
          },
          body: JSON.stringify({ orderedIds: updated.map((n) => n.id) }),
        }).catch((err) => console.error("Reorder failed:", err));

        return updated;
      });
    },
    [category, session?.user?.email]
  );

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    const handleRefresh = () => fetchNotes();
    window.addEventListener("refreshNotes", handleRefresh);
    return () => window.removeEventListener("refreshNotes", handleRefresh);
  }, [fetchNotes]);

  if (status === "loading")
    return <DesktopLoader parentStyle="xs:grid lg:hidden" />;

  return (
    <section className="xs:flex flex-col xs:p-5 md:p-7 lg:hidden basis-full gap-7">
      <MobileHeader />

      {!opened_dynamic_route && (
        <NotesList
          title={title}
          category={category}
          notes={notes}
          handleDragEnd={handleDragEnd}
          className="flex h-full basis-full flex-col gap-7"
        />
      )}
      {children}
    </section>
  );
};

export default MobileLayout;
