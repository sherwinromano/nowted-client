import { DragEndEvent } from "@dnd-kit/core";
import { Dispatch, SetStateAction } from "react";

type DropdownItem = {
  label: string;
  image: {
    src: string;
    alt: string;
  };
  action: string;
  method: string;
  path: string;
};

export type Note = {
  id: number;
  title: string;
  date: string;
  description: string;
};

export type LayoutProps = {
  title: string;
  category: string;
  children: React.ReactNode;
};

export type DropdownChildrenProps = {
  dropdown_children: DropdownItem[];
};

export type NotesListProps = {
  title: string;
  category: string;
  notes?: Note[];
  handleDragEnd: (event: DragEndEvent) => void;
  loading: boolean;
  className: string;
};

export type Notes = Note[];

export type NoteCardProps = {
  notes: Note[];
};

export type EditButtonProps = {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  updatedNote: string;
  folder: string;
  id: string;
};

export type FontSizeDropdownProps = {
  fontSizes: string[];
  setFontSize: Dispatch<SetStateAction<string>>;
};
