/* Component for more options link in navigation */

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const More = () => {
  const pathname = usePathname();
  const links = [
    {
      name: "Favorites",
      url: "/favorites",
      image_src: "/star.svg",
      image_alt: "Star icon",
    },
    {
      name: "Trash",
      url: "/trash",
      image_src: "/trash-bin.svg",
      image_alt: "Trash bin icon",
    },
    {
      name: "Archived Notes",
      url: "/archived-notes",
      image_src: "/doc-box.svg",
      image_alt: "Document box icon",
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
                "flex items-center gap-3.5 basis-full px-4 py-2",
                isActive ? "bg-active-link" : null
              )}
            >
              <Image
                src={link.image_src}
                alt={link.image_alt}
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

export default More;
