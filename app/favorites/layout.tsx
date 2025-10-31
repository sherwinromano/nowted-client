import React from "react";
import DesktopLayout from "../components/layout/DesktopLayout";
import MobileLayout from "../components/layout/MobileLayout";

const FavoritesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DesktopLayout title="Favorites" category="favorites">
        {children}
      </DesktopLayout>
      <MobileLayout title="Favorites" category="favorites">
        {children}
      </MobileLayout>
    </>
  );
};

export default FavoritesLayout;
