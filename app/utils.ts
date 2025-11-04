// ?? Moving note to different folders utility function
const URLAction = (parentURL: string, folderURL: string, id: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}api/${parentURL}/${folderURL}/${id}`;
};

// ?? Font size resizing in note description
const getFontSizeClass = (fontSize: string) => {
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

export const trimText = (text: string, length: number): string => {
  if (!text) return "";
  return text.length > length ? text.slice(0, length) + "..." : text;
};

export const getTrimLength = (): number => {
  if (typeof window === "undefined") return 17;
  const width = window.innerWidth;

  if (width < 640) return 32;
  if (width < 768) return 83;
  if (width < 1024) return 110;
  return 17;
};

export { URLAction, getFontSizeClass };
