"use client";

import { useEffect, useRef, useState } from "react";
import { getTripPlan, type TripCard } from "@/data/mockResponse";
import ThinkingDots from "@/components/ThinkingDots";
import TripCards from "@/components/TripCards";

type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; status: "thinking" }
  | { id: number; role: "assistant"; status: "done"; cards: TripCard[] };

const SUGGESTION = "Plan a weekend in Kyoto for two";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hand focus back to the input once the reply has landed.
  useEffect(() => {
    if (!busy && messages.length) inputRef.current?.focus();
  }, [busy, messages.length]);

  // Scroll so the top of the newest bubble is in view: a guest reads the stay card first, not the food card.
  useEffect(() => {
    const items = endRef.current?.parentElement?.querySelectorAll("[data-msg]");
    items?.[items.length - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    setInput("");

    const userId = nextId.current++;
    const replyId = nextId.current++;
    setMessages((m) => [
      ...m,
      { id: userId, role: "user", text: trimmed },
      { id: replyId, role: "assistant", status: "thinking" },
    ]);

    // Happy path: any message returns the three cards after the thinking animation.
    const cards = await getTripPlan();
    setMessages((m) =>
      m.map((msg) => (msg.id === replyId ? { id: replyId, role: "assistant", status: "done", cards } : msg)),
    );
    setBusy(false);
  }

  return (
    <main className="mx-auto flex h-[100dvh] w-full max-w-2xl flex-col">
      <header className="border-b border-neutral-200 bg-white px-4 py-3">
        <h1 className="text-base font-semibold">Kyoto trip planner</h1>
        <p className="text-xs text-muted">Tell me about your trip. I&apos;ll plan the whole weekend.</p>
      </header>

      <section className="flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
        {/* Greeting so the chat is never blank */}
        <AssistantBubble>
          <p className="text-sm">
            Hi! I can plan your Kyoto weekend: a place to stay, something to do, and somewhere to eat. Where
            should we start?
          </p>
        </AssistantBubble>

        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} data-msg className="flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-neutral-900 px-4 py-2 text-sm text-white">
                {msg.text}
              </p>
            </div>
          ) : (
            <AssistantBubble key={msg.id} data-msg>
              {msg.status === "thinking" ? (
                <ThinkingDots />
              ) : (
                <>
                  <p className="mb-3 text-sm">Here&apos;s your Kyoto weekend:</p>
                  <TripCards cards={msg.cards} />
                </>
              )}
            </AssistantBubble>
          ),
        )}
        <div ref={endRef} />
      </section>

      <footer className="border-t border-neutral-200 bg-white px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3">
        {messages.length === 0 && !busy && (
          <button
            type="button"
            onClick={() => send(SUGGESTION)}
            className="mb-2 rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100"
          >
            {SUGGESTION}
          </button>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
            placeholder={busy ? "Planning your weekend…" : "Plan a weekend in Kyoto…"}
            aria-label="Message"
            className="flex-1 rounded-full border border-neutral-300 px-4 py-2.5 text-base outline-none focus:border-neutral-900 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-full bg-neutral-900 px-5 text-sm font-semibold text-white disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </footer>
    </main>
  );
}

function AssistantBubble({ children, ...rest }: { children: React.ReactNode; "data-msg"?: boolean }) {
  return (
    <div className="flex scroll-mt-4 justify-start" {...rest}>
      <div className="w-full max-w-[min(100%,392px)] rounded-2xl rounded-bl-sm bg-neutral-100 px-4 py-3">
        {children}
      </div>
    </div>
  );
}
