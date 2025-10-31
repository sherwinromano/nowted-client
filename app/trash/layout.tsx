import React from "react";
import DesktopLayout from "../components/layout/DesktopLayout";
import MobileLayout from "../components/layout/MobileLayout";

const TrashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DesktopLayout title="Trash" category="trash">
        {children}
      </DesktopLayout>
      <MobileLayout title="Trash" category="trash">
        {children}
      </MobileLayout>
    </>
  );
};

export default TrashLayout;
