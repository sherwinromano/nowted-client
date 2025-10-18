import Image from "next/image";

const Work = () => {
  return (
    <section className="basis-full p-7 grid place-items-center">
      <div className="flex flex-col items-center gap-2.5 w-[60%]">
        <Image src={"/note.svg"} alt="Note icon" width={65} height={65} />
        <div className="flex flex-col items-center gap-2.5">
          <h1 className="font-semibold text-2xl text-primary">
            Select a note to view
          </h1>
          <p className="text-center text-secondary leading-[1.2]">
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Work;
