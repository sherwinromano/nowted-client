import React from "react";
import DesktopLayout from "../components/layout/DesktopLayout";
import MobileLayout from "../components/layout/MobileLayout";

const PersonalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DesktopLayout title="Personal" category="personal">
        {children}
      </DesktopLayout>
      <MobileLayout title="Personal" category="personal">
        {children}
      </MobileLayout>
    </>
  );
};

export default PersonalLayout;
