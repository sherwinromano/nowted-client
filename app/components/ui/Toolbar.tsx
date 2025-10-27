"use client";

import Image from "next/image";

type ToolbarProps = {
  onToggleBold: () => void;
  onToggleItalic: () => void;
  onToggleUnderline: () => void;
};

const Toolbar = ({
  onToggleBold,
  onToggleItalic,
  onToggleUnderline,
}: ToolbarProps) => {
  const textSettings = [
    {
      src: "/bold.svg",
      alt: "Bold text icon",
      onClick: onToggleBold,
    },
    {
      src: "/italic.svg",
      alt: "Italic text icon",
      onClick: onToggleItalic,
    },
    {
      src: "/underline.svg",
      alt: "Underline text icon",
      onClick: onToggleUnderline,
    },
  ];

  return (
    <div className="xs:hidden lg:flex gap-2.5">
      {textSettings.map((item, index) => {
        return (
          <button
            className="grid place-items-center cursor-pointer"
            key={index}
            onClick={item.onClick}
          >
            <Image src={item.src} alt={item.alt} width={18} height={18} />
          </button>
        );
      })}
    </div>
  );
};

export default Toolbar;
