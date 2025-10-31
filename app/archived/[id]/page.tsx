import Page from "@/app/components/ui/Page.client";
import { URLAction } from "@/app/utils";

const ArchivedNote = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const dropdown_children = [
    {
      label: "Trash",
      image: {
        src: "/trash-bin.svg",
        alt: "Trash bin icon",
      },
      action: URLAction("archived", "trash", id),
      method: "DELETE",
      path: "/trash",
    },
  ];

  return (
    <Page
      title="Archived notes"
      id={id}
      category="archived"
      dropdown_children={dropdown_children}
    />
  );
};

export default ArchivedNote;
