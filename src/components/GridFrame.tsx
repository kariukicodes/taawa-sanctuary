import type { ReactNode } from "react";

type GridFrameProps = {
  children: ReactNode;
};

export default function GridFrame({ children }: GridFrameProps) {
  return (
    <div className="relative isolate min-h-screen bg-taawa-bg">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[10vw] min-w-10 max-w-24 lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,48,40,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,48,40,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[10vw] min-w-10 max-w-24 lg:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(28,48,40,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,48,40,0.05) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}