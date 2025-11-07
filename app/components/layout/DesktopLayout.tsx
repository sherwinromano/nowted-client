"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import NotesList from "../ui/NotesList";
import { LayoutProps, Note } from "@/app/types";
import Loader from "../ui/Loader";
import { DragEndEvent } from "@dnd-kit/core";

const DesktopLayout = ({ title, category, children }: LayoutProps) => {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}api/${category}/reorder`, {
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

  if (status === "loading") return <Loader parentStyle="xs:hidden lg:grid" />;

  return (
    <section className="xs:hidden lg:flex basis-full">
      <NotesList
        loading={isLoading}
        title={title}
        category={category}
        notes={notes}
        handleDragEnd={handleDragEnd}
        className="flex bg-secondary h-full basis-[28rem] py-7 px-5 flex-col gap-7"
      />
      {children}
    </section>
  );
};

export default DesktopLayout;
