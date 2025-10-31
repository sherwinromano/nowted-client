/* Component for folders link in navigation */

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const Folders = () => {
  const pathname = usePathname();

  const links = [
    {
      name: "Personal",
      url: "/personal",
    },
    {
      name: "Work",
      url: "/work",
    },
  ];

  return (
    <ul className="flex flex-col gap-1">
      {links.map((link) => {
        const isActive =
          pathname === link.url || pathname.startsWith(`${link.url}/`);

        return (
          <li key={link.name} className="flex">
            <Link
              href={link.url}
              className={clsx(
                "flex items-center gap-3.5 basis-full xs:px-3 lg:px-4 py-2",
                isActive ? "bg-active-link" : null
              )}
            >
              <Image
                src={isActive ? "/folder-opened.svg" : "/folder-closed.svg"}
                alt="Folder closed icon"
                height={20}
                width={20}
              />
              <span
                className={clsx(
                  "font-semibold",
                  isActive ? "text-primary" : null
                )}
              >
                {link.name}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Folders;
