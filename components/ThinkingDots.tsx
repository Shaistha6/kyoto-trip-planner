// Thinking animation: three pulsing dots inside an assistant bubble.
export default function ThinkingDots() {
  return (
    <div role="status" aria-label="Planning your Kyoto weekend" className="flex items-center gap-1.5 py-1">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-2.5 w-2.5 animate-bounce rounded-full bg-neutral-400"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
