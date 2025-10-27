"use client";

import { DropdownChildrenProps } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MenuDropdownChildren = ({ dropdown_children }: DropdownChildrenProps) => {
  const router = useRouter();

  const handleClick = async (url: string, method: string, path: string) => {
    try {
      const res = await fetch(url, { method: method });
      if (!res.ok) throw new Error("Request failed");
      // optionally update UI / show toast / revalidate
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
