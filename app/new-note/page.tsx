import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function createNote(formData: FormData) {
  "use server";

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const folder = formData.get("folder")?.toString();

  if (!title || !description || !folder) {
    throw new Error("Missing required fields");
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/${folder}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.text();
      console.error("API Error:", errorData);
      throw new Error("Failed to create note");
    }

    // Only revalidate and redirect if the fetch was successful
    revalidatePath(`/${folder}`);
    return redirect(`/${folder}`); // Changed to return the redirect
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      // If it's a redirect error, let it propagate
      throw error;
    }
    console.error("Create note error:", error);
    throw new Error("Failed to create note");
  }
}

const NewNote = () => {
  return (
    <section className="bg-secondary basis-full grid place-items-center">
      <form
        action={createNote}
        className="flex flex-col gap-4 text-primary w-1/2 bg-[#333333] border border-[#747474] p-7 rounded-[16px]"
      >
        <label htmlFor="title">Title</label>
        <input
          className="border-b border-[#747474] outline-none text-base"
          type="text"
          name="title"
          id="title"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className="border-b border-[#747474] outline-none text-base resize-none"
          rows={10}
          required
        ></textarea>
        <div className="flex flex-col gap-2">
          <label htmlFor="folder">Folder</label>
          <select
            name="folder"
            id="folder"
            className="bg-[#333333] border border-[#747474] p-2 rounded-lg"
            required
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-black cursor-pointer text-sm text-white py-3 rounded-md hover:opacity-90"
        >
          Create Note
        </button>
      </form>
    </section>
  );
};

export default NewNote;
