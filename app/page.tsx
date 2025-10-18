import { redirect } from "next/navigation";

const Page = () => {
  // ? Redirect on personal route on load.
  redirect("/personal");
};

export default Page;
