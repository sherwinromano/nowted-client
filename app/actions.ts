"use server";

import { signIn, signOut } from "@/app/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type NoteFormData = {
  formData: FormData;
  email: string;
};

const signInWithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

const signInWithGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};

const authSignOut = async () => {
  await signOut({ redirectTo: "/sign-in" });
};

const createNote = async ({ formData, email }: NoteFormData) => {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const folder = formData.get("folder")?.toString();

  if (!title || !description || !folder) {
    throw new Error("Missing required fields");
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}api/${folder}/`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-email": email,
    },
    body: JSON.stringify({ title, description }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("API Error:", {
      status: res.status,
      statusText: res.statusText,
      body: errorText,
    });
    throw new Error(`Failed to create note: ${res.status} ${res.statusText}`);
  }

  revalidatePath(`/${folder}`);
  return redirect(`/${folder}`);
};

export { signInWithGoogle, signInWithGithub, authSignOut, createNote };
