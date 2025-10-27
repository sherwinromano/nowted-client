"use client";

import clsx from "clsx";
import Image from "next/image";
import { createContext, useContext, useState } from "react";

type DropdownProps = {
  label: string;
  children: React.ReactNode;
  width?: string;
  borderColor: string;
};

type DropdownContextType = {
  setIsOpenedDropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

const Dropdown = ({ label, children, width, borderColor }: DropdownProps) => {
  const [isOpenedDropdown, setIsOpenedDropdown] = useState<boolean>(false);

  return (
    <DropdownContext.Provider value={{ setIsOpenedDropdown }}>
      <div className={clsx("xs:hidden lg:flex relative ", width)}>
        <div
          className={clsx(
            "border rounded-sm py-1 px-4 flex items-center gap-2 cursor-pointer select-none w-full justify-between ",
            borderColor
          )}
          onClick={() => setIsOpenedDropdown((prev) => !prev)}
        >
          <span className="text-primary text-base font-semibold">{label}</span>
          <Image
            className={clsx(
              "transition-all",
              isOpenedDropdown ? "rotate-180" : "rotate-0"
            )}
            src={"/chevron.svg"}
            alt="Chevron icon"
            width={16}
            height={16}
          />
        </div>
        {isOpenedDropdown && children}
      </div>
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};

export default Dropdown;
