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

export { URLAction, getFontSizeClass };
