"use client";

import { useState } from "react";
import FontSizeSelector from "./FontSizeSelector";
import Toolbar from "./Toolbar";
import clsx from "clsx";

const NoteDescription = ({ note }: { note: string }) => {
  const [fontSize, setFontSize] = useState("M");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "XS":
        return "lg:text-xs";
      case "S":
        return "lg:text-sm";
      case "M":
        return "lg:text-base";
      case "L":
        return "lg:text-lg";
      case "XL":
        return "lg:text-xl";
      default:
        return "lg:text-base";
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex gap-8">
        <FontSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
        <Toolbar
          onToggleBold={() => setIsBold((prev) => !prev)}
          onToggleItalic={() => setIsItalic((prev) => !prev)}
          onToggleUnderline={() => setIsUnderline((prev) => !prev)}
        />
      </div>
      <div className="flex">
        <p
          className={clsx(
            "text-primary leading-[28px] xs:text-base",
            getFontSizeClass(),
            {
              "lg:font-bold": isBold,
              "lg:italic": isItalic,
              "lg:underline": isUnderline,
            }
          )}
        >
          {note}
        </p>
      </div>
    </div>
  );
};

export default NoteDescription;
