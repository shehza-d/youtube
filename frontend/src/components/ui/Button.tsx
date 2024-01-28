import Loader from "./Loader";

export default function Button({
  children,
  loading = false,
  className,
  type,
}: {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type || "button"}
      disabled={loading}
      className={`${className} mr-1 h-12 w-full bg-primary px-3 py-2 text-center text-xl font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out hover:opacity-95 active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] disabled:cursor-not-allowed sm:w-auto`}
    >
      {loading ? <Loader width="w-5" height="h-5" /> : children}
    </button>
  );
}
