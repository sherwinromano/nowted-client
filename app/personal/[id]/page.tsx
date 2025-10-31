import Page from "@/app/components/ui/Page.client";
import { URLAction } from "@/app/utils";

const PersonalNote = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const dropdown_children = [
    {
      label: "Add to favorites",
      image: { src: "/star.svg", alt: "Star icon" },
      action: URLAction("personal", "favorites", id),
      method: "POST",
      path: "/favorites",
    },
    {
      label: "Archived",
      image: { src: "/doc-box.svg", alt: "Doc box icon" },
      action: URLAction("personal", "archived", id),
      method: "POST",
      path: "/archived",
    },
    {
      label: "Trash",
      image: { src: "/trash-bin.svg", alt: "Trash bin icon" },
      action: URLAction("personal", "trash", id),
      method: "DELETE",
      path: "/trash",
    },
  ];

  return (
    <Page
      title="Personal"
      id={id}
      category="personal"
      dropdown_children={dropdown_children}
    />
  );
};

export default PersonalNote;
