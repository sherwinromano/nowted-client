"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";
import Folders from "../navigation/Folders";
import More from "../navigation/More";
import { authSignOut } from "@/app/actions";

type SidebarEventProp = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileHeader = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="xs:flex justify-between items-center lg:hidden">
      <Image src={"/logo.svg"} alt="Nowted logo" height={100} width={100} />
      <button
        onClick={() => setOpenSidebar(true)}
        aria-label="Open sidebar menu"
        className="grid place-items-center cursor-pointer"
      >
        <Image
          src={"/bars-3.svg"}
          alt="Hamburger icon"
          height={24}
          width={24}
        />
      </button>
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
    </div>
  );
};

const Sidebar = ({ openSidebar, setOpenSidebar }: SidebarEventProp) => {
  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!openSidebar}
        className={clsx(
          "fixed inset-0 z-40 transition-opacity duration-300",
          openSidebar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpenSidebar(false)}
      >
        <div className="w-full h-full bg-black/50" />
      </div>

      {/* Sidebar drawer */}
      <aside
        className={clsx(
          "fixed top-0 right-0 z-50 h-full xs:w-[60%] sm:w-1/2 bg-primary text-primary p-4 transform transition-transform duration-300 flex flex-col",
          openSidebar ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!openSidebar}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click
      >
        <button
          onClick={() => setOpenSidebar(false)}
          aria-label="Close menu"
          className="self-end"
        >
          <Image src={"/x-mark.svg"} alt="Close" height={24} width={24} />
        </button>

        <nav className="flex flex-col h-full">
          <div className="flex flex-col gap-3 mt-4">
            <h2 className="text-sm font-semibold">Folders</h2>
            <Folders />
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <h2 className="text-sm font-semibold">More</h2>
            <More />
          </div>

          <button className="bg-[#242424] flex cursor-pointer rounded-sm mt-8">
            <Link
              href={"/new-note"}
              className="flex justify-center gap-2 p-2.5 basis-full"
            >
              <Image src={"/plus.svg"} alt="Plus icon" height={18} width={18} />
              <span className="font-semibold text-primary text-sm">
                New note
              </span>
            </Link>
          </button>
        </nav>
        <button
          className="flex items-center justify-center gap-2 bg-red-500 py-2 px-4 rounded-md cursor-pointer self-end"
          onClick={() => authSignOut()}
        >
          <Image
            src={"/arrow-left-start.svg"}
            alt="Arrow left start icon"
            width={24}
            height={24}
          />
          <span className="text-sm text-primary font-medium">Sign Out</span>
        </button>
      </aside>
    </>
  );
};

export default MobileHeader;
