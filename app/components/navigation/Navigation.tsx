"use client";

import Link from "next/link";
import Folders from "./Folders";
import More from "./More";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { authSignOut } from "@/app/actions";

const Navigation = () => {
  const pathname = usePathname();

  if (pathname === "/sign-in") return null;

  return (
    <nav className="xs:hidden lg:flex basis-[30%] py-6 text-secondary flex-col justify-between">
      <div className="flex flex-col gap-7 h-fit">
        <div className="flex flex-col gap-4 px-4">
          <div className="flex justify-between items-center">
            <Image
              src={"/logo.svg"}
              alt="Nowted logo"
              height={100}
              width={100}
            />
          </div>
          <button className="bg-[#242424] flex cursor-pointer rounded-xs">
            <Link
              href={"/new-note"}
              className="flex justify-center gap-2 p-2.5 basis-full"
            >
              <Image src={"/plus.svg"} alt="Plus icon" height={18} width={18} />
              <span className="font-semibold text-primary">New note</span>
            </Link>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="px-4 text-sm font-semibold">Folders</h2>
          <Folders />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="px-4 text-sm font-semibold">More</h2>
          <More />
        </div>
      </div>
      <button
        className="flex items-center justify-center gap-2 bg-red-500 py-2 px-4 rounded-md cursor-pointer self-start ml-4"
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
    </nav>
  );
};

export default Navigation;
