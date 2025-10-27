import React from "react";
import { Notes } from "../types";
import DesktopLayout from "../components/layout/DesktopLayout";
import MobileLayout from "../components/layout/MobileLayout";

const PersonalLayout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/personal`, {
    cache: "no-store",
  });
  const notes: Notes = await res.json();

  return (
    <>
      <DesktopLayout
        title="Personal"
        category="personal"
        notes={notes}
        children={children}
      />
      <MobileLayout
        title="Personal"
        category="personal"
        notes={notes}
        children={children}
      />
    </>
  );
};

export default PersonalLayout;
