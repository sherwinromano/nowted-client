import { Spinner } from "@/app/components/ui/spinner";
import clsx from "clsx";

const Loader = ({ parentStyle }: { parentStyle: string }) => {
  return (
    <section className={clsx(parentStyle, " place-items-center basis-full")}>
      <div className="flex flex-col items-center gap-4">
        <Spinner className="text-primary size-8" />
        <p className="text-primary font-medium text-lg">Loading</p>
      </div>
    </section>
  );
};

export default Loader;
