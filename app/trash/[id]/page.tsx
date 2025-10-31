import Page from "@/app/components/ui/Page.client";

const TrashNote = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const recoverUrl = `${process.env.NEXT_PUBLIC_API_URL}api/trash/${id}`;
  const trashUrl = `${process.env.NEXT_PUBLIC_API_URL}api/trash/${id}`;

  const dropdown_children = [
    {
      label: "Recover",
      image: {
        src: "/folder-closed.svg",
        alt: "Folder closed icon",
      },
      action: recoverUrl,
      method: "POST",
      path: "/personal",
    },
    {
      label: "Delete",
      image: {
        src: "/trash-bin.svg",
        alt: "Trash bin icon",
      },
      action: trashUrl,
      method: "DELETE",
      path: "/personal",
    },
  ];

  return (
    <Page
      title="Trash"
      id={id}
      category="trash"
      dropdown_children={dropdown_children}
    />
  );
};

export default TrashNote;
