/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import React, { useState } from "react";
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
import SkeletonGroup from "./SkeletonGroup";
import { getTrimLength, trimText } from "@/app/utils";

const NotesList = ({
  title,
  category,
  notes,
  loading,
  handleDragEnd,
  className,
}: NotesListProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const notesArray = Array.isArray(notes) ? notes : [];
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const NoteCard = ({ notes }: NoteCardProps) => {
    const trim_text = (text: string, length: number) => {
      return text.length > 15 ? text.slice(0, length) + "..." : text;
    };

    return notes.map((note) => {
      const description = note.description ?? "";
      const id = note.id;

      const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

      const style: React.CSSProperties = {
        transition,
        transform: CSS.Transform.toString(transform),
      };

      return (
        <li
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
          className="bg-[#232323] flex rounded-sm overflow-hidden"
          key={id}
        >
          <Link
            href={`/${category}/${id}`}
            className="p-4 flex flex-col gap-2.5 basis-full"
            onClick={(e) => {
              if (isDragging) {
                e.preventDefault();
              }
            }}
          >
            <h3 className="text-primary font-semibold text-lg leading-[24px]">
              {note.title}
            </h3>
            <div className="flex items-center gap-2.5">
              <span className="text-tertiary">{note.date}</span>

              <p className="text-secondary">
                {trimText(description, getTrimLength())}
              </p>
            </div>
          </Link>
        </li>
      );
    });
  };

  return (
    <section className={className}>
      <h2 className="text-primary font-semibold text-xl">{title}</h2>
      {loading ? (
        <SkeletonGroup />
      ) : notesArray.length === 0 ? (
        <section className="h-full grid place-items-center">
          <p className="text-primary font-semibold">Empty notes</p>
        </section>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(event) => {
            setIsDragging(false);
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
      )}
    </section>
  );
};

export default NotesList;
