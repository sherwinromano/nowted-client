"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NotesListProps, NoteCardProps } from "@/app/types";
import {
  closestCorners,
  DndContext,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const NotesList = ({
  title,
  category,
  notes,
  handleDragEnd,
  className,
}: NotesListProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragEndedRecently, setDragEndedRecently] = useState(false);
  const dragTimeout = useRef<NodeJS.Timeout | null>(null);

  const notesArray = Array.isArray(notes) ? notes : [];
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const NoteCard = ({ notes }: NoteCardProps) => {
    return notes.map((note) => {
      const text = note.description ?? "";
      const shortText = text.length > 15 ? text.slice(0, 15) + "..." : text;
      const id = note.id;

      const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

      const style: React.CSSProperties = {
        transition,
        transform: CSS.Transform.toString(transform),
        cursor: isDragging ? "grabbing" : "grab",
      };

      const handleClick = (e: React.MouseEvent) => {
        // ⛔️ Block link if still dragging or right after drag
        if (isDragging || dragEndedRecently) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      return (
        <li
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className="bg-[#232323] flex rounded-sm overflow-hidden select-none"
          key={id}
        >
          <Link
            href={`/${category}/${id}`}
            className="p-4 flex flex-col gap-2.5 basis-full"
            onClick={handleClick}
          >
            <h3 className="text-primary font-semibold text-lg leading-[24px]">
              {note.title}
            </h3>
            <div className="flex items-center gap-2.5">
              <span className="text-tertiary">{note.date}</span>
              <p className="text-secondary flex-1 min-w-0 truncate">
                {shortText}
              </p>
            </div>
          </Link>
        </li>
      );
    });
  };

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (dragTimeout.current) clearTimeout(dragTimeout.current);
    };
  }, []);

  return (
    <section className={className}>
      <h2 className="text-primary font-semibold text-xl">{title}</h2>
      {!notesArray.length && (
        <h6 className="font-semibold text-primary">Empty notes</h6>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event) => {
          setIsDragging(false);
          setDragEndedRecently(true);
          if (dragTimeout.current) clearTimeout(dragTimeout.current);
          dragTimeout.current = setTimeout(
            () => setDragEndedRecently(false),
            150
          );
          handleDragEnd(event);
        }}
        onDragCancel={() => setIsDragging(false)}
      >
        <SortableContext
          items={notesArray.map((n) => n.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden scrollbar-hide h-full">
            <NoteCard notes={notesArray} />
          </ul>
        </SortableContext>
      </DndContext>
    </section>
  );
};

export default NotesList;
