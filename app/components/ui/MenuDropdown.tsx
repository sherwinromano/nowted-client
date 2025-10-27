"use client";

import Image from "next/image";
import { useState } from "react";

const MenuDropdown = ({ children }: { children: React.ReactNode }) => {
  const [toggleMenuDropdown, setToggleMenuDropdown] = useState(false);

  return (
    <div className="flex relative">
      <button
        onClick={() => setToggleMenuDropdown((prev) => !prev)}
        className="grid place-items-center border border-[#747474] rounded-full p-1 cursor-pointer"
      >
        <Image
          src={"/ellipsis-horizontal.svg"}
          alt="Ellipsis icon"
          width={24}
          height={24}
        />
      </button>
      {toggleMenuDropdown && (
        <div className="bg-[#333333] border border-[#747474] rounded-md p-3.5 w-[12rem] mt-4 absolute right-0 top-full flex">
          {children}
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
