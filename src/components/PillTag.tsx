interface PillTagProps {
  children: React.ReactNode;
  className?: string;
}

const PillTag = ({ children, className = "" }: PillTagProps) => (
  <span
    className={`inline-flex items-center gap-2 rounded-pill px-4 py-[0.32rem] font-instrument font-medium text-[0.73rem] text-taawa-muted border border-taawa-green/[0.12] bg-white/70 ${className}`}
  >
    <span className="w-[6px] h-[6px] rounded-full bg-taawa-lime border border-taawa-green" />
    {children}
  </span>
);

export default PillTag;

