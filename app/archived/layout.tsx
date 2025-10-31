import React from "react";
import DesktopLayout from "../components/layout/DesktopLayout";
import MobileLayout from "../components/layout/MobileLayout";

const ArchivedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DesktopLayout title="Archived notes" category="archived">
        {children}
      </DesktopLayout>
      <MobileLayout title="Archived notes" category="archived">
        {children}
      </MobileLayout>
    </>
  );
};

export default ArchivedLayout;
