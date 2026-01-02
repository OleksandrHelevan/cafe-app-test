import { LoaderItem } from "./LoaderItem";

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/80">
      <div
        className="relative h-[200px] w-[200px] pointer-events-none select-none animate-spin"
        style={{
          animation: "spin 2s linear infinite",
        }}
      >
        <LoaderItem rotate={0} left="calc(100% - 100px)" top="0" />
        <LoaderItem rotate={45} left="calc(100% - 80px)" top="25%" />
        <LoaderItem rotate={90} left="calc(100% - 100px)" top="50%" />
        <LoaderItem rotate={135} left="calc(100% - 150px)" top="60%" />
        <LoaderItem rotate={180} left="0" top="50%" />
        <LoaderItem rotate={225} left="-20px " top="25%" />
        <LoaderItem rotate={270} left="0" top="0" />
        <LoaderItem rotate={315} left="calc(50% - 50px)" top="-20px" />
      </div>
    </div>
  );
}
