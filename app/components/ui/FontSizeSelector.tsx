"use client";

import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type FontSizeSelectorProps = {
  fontSize: string;
  setFontSize: Dispatch<SetStateAction<string>>;
};

type FontSizeDropdownProps = {
  fontSizes: string[];
  setFontSize: Dispatch<SetStateAction<string>>;
  setIsOpenedDropdown: Dispatch<SetStateAction<boolean>>;
};

const FontSizeSelector = ({ fontSize, setFontSize }: FontSizeSelectorProps) => {
  const [isOpenedDropdown, setIsOpenedDropdown] = useState<boolean>(false);
  const fontSizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="flex relative basis-[10%]">
      <div
        className="border border-[#2f2f2f] rounded-sm py-1 px-4 flex items-center gap-2 cursor-pointer select-none w-full justify-between"
        onClick={() => setIsOpenedDropdown((prev) => !prev)}
      >
        <span className="text-primary text-base font-semibold">{fontSize}</span>
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
      {isOpenedDropdown && (
        <FontSizeDropdown
          fontSizes={fontSizes}
          setFontSize={setFontSize}
          setIsOpenedDropdown={setIsOpenedDropdown}
        />
      )}
    </div>
  );
};

const FontSizeDropdown = ({
  fontSizes,
  setFontSize,
  setIsOpenedDropdown,
}: FontSizeDropdownProps) => {
  return (
    <ul className="absolute bg-primary w-full top-full border border-[#2f2f2f] rounded-sm mt-2">
      {fontSizes.map((item) => {
        return (
          <li
            className="font-semibold text-sm text-primary p-1 cursor-pointer text-center hover:bg-[#1f1f1f]"
            key={item}
            onClick={() => {
              setFontSize(item);
              setIsOpenedDropdown(false);
            }}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default FontSizeSelector;
