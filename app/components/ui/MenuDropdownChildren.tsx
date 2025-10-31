"use client";

import { DropdownChildrenProps } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const MenuDropdownChildren = ({ dropdown_children }: DropdownChildrenProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = async (url: string, method: string, path: string) => {
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-user-email": session?.user?.email || "",
        },
      });
      if (!res.ok) throw new Error("Request failed");

      router.push(path);
      router.refresh();
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  return (
    <ul className="flex flex-col gap-6 w-full">
      {dropdown_children.map((item) => {
        return (
          <li
            onClick={() => handleClick(item.action, item.method, item.path)}
            className="flex items-center cursor-pointer gap-3.5"
            key={item.label}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              height={20}
              width={20}
            />
            <span className="text-primary">{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuDropdownChildren;
