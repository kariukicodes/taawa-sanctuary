import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CRISIS_PATTERNS = [
  /\bsuicid/i,
  /\bkill myself\b/i,
  /\bend my life\b/i,
  /\bwant to die\b/i,
  /\bharm myself\b/i,
  /\bhurt myself\b/i,
  /\bself[\s-]?harm/i,
  /\bnot safe\b/i,
  /\bkill (him|her|them)\b/i,
];

const CRISIS_MESSAGE: Message = {
  role: "assistant",
  content:
    "It sounds like you might be going through something really difficult right now. I'm not able to help with this directly, but real support is available right now:\n\n" +
    "📞 Befrienders Kenya: 0800 723 253 (toll-free, 24/7)\n" +
    "🆘 If you or someone else is in immediate danger, please call 999 or go to your nearest hospital.\n\n" +
    "You can also see our full Crisis Support page for more resources.",
};

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi, I'm the Taawa website assistant 👋 I can help you find the right service, explain how sessions work, or guide you through booking. I'm not a counsellor — for anything personal, that's exactly what your session is for.",
};

const QUICK_ACTIONS = [
  { label: "Find care that fits", prompt: "What service fits my situation?", icon: "💚" },
  { label: "How sessions work", prompt: "How do sessions work?", icon: "🗓️" },
  { label: "Confidentiality", prompt: "Is everything confidential?", icon: "🔒" },
  { label: "Meet the counsellor", prompt: "Tell me about your counsellor credentials.", icon: "👤" },
];

function containsCrisisLanguage(text: string): boolean {
  return CRISIS_PATTERNS.some((pattern) => pattern.test(text));
}

export default function AIAssistant(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasConversation = messages.length > 1;

  useEffect(() => {
    if (hasConversation) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, loading, hasConversation]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setInput("");

    if (containsCrisisLanguage(trimmed)) {
      setMessages((prev) => [...prev, userMessage, CRISIS_MESSAGE]);
      return;
    }

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("taawa-assistant", {
        body: {
          messages: nextMessages
            .filter((message) => message !== WELCOME_MESSAGE)
            .map((message) => ({ role: message.role, content: message.content })),
        },
      });

      if (error || !data?.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I'm having trouble responding right now. You can also reach us directly via the Contact page.",
          },
        ]);
      } else if (containsCrisisLanguage(data.reply)) {
        setMessages((prev) => [...prev, CRISIS_MESSAGE]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again or use the Contact page.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-taawa-green px-4 py-3 text-white shadow-[0_18px_50px_rgba(23,37,42,0.28)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(23,37,42,0.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-taawa-lime"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,#66e28f_0%,#d6ef59_48%,#355847_100%)] shadow-[inset_0_0_12px_rgba(255,255,255,0.35)]" />
        <span className="font-instrument text-sm font-semibold leading-none">{open ? "Close" : "Ask Taawa"}</span>
        <span className="text-lg leading-none opacity-80">{open ? "×" : "↑"}</span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex max-h-[82vh] w-[92vw] max-w-[430px] flex-col overflow-hidden rounded-[28px] border border-black/5 bg-[#f8fbf7] shadow-[0_30px_90px_rgba(23,37,42,0.22)] animate-[fadeUp_0.25s_ease]">
          <div className="flex items-center justify-between bg-taawa-green px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,#66e28f_0%,#d6ef59_48%,#355847_100%)] shadow-[inset_0_0_12px_rgba(255,255,255,0.35)]" />
              <div>
                <div className="font-syne text-sm font-bold leading-tight">Taawa Assistant</div>
                <div className="text-[10px] text-white/70">Your guide to Taawa</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="text-xl leading-none text-white/75 transition-colors hover:text-white">
              ×
            </button>
          </div>

          <div className="overflow-y-auto px-5 pb-4 pt-6">
            {!hasConversation && (
              <div className="rounded-[24px] border border-white/70 bg-white px-5 py-6 shadow-[0_8px_30px_rgba(23,37,42,0.04)]">
                <div className="mb-5 flex items-start gap-4">
                  <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_35%,#66e28f_0%,#d6ef59_48%,#355847_100%)] shadow-[inset_0_0_18px_rgba(255,255,255,0.4)]" />
                  <div className="pt-1">
                    <h2 className="font-syne text-[1.8rem] font-medium tracking-tight text-taawa-text">Where should we begin?</h2>
                    <p className="mt-3 max-w-[320px] text-[0.98rem] leading-relaxed text-taawa-muted">
                      Ask about finding care, how sessions work, or anything practical about booking and confidentiality.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => setInput(action.prompt)}
                      className="group flex items-center gap-3 rounded-[18px] border border-[#dbe6df] bg-[#f7fbf8] px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#bfd8c7] hover:bg-white hover:shadow-[0_10px_24px_rgba(23,37,42,0.06)]"
                    >
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px] bg-white text-base shadow-[0_4px_14px_rgba(23,37,42,0.06)]">{action.icon}</span>
                      <span className="font-instrument text-sm font-semibold text-taawa-text transition-colors group-hover:text-taawa-green">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasConversation && (
              <div ref={scrollRef} className="flex max-h-[360px] min-h-[260px] flex-1 flex-col space-y-3 overflow-y-auto rounded-[24px] border border-[#dbe6df] bg-white px-4 py-4 shadow-[0_8px_30px_rgba(23,37,42,0.04)]">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-[18px] px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                        message.role === "user"
                          ? "rounded-br-sm bg-taawa-lime text-taawa-green"
                          : "rounded-bl-sm border border-[#dbe6df] bg-[#f7fbf8] text-taawa-text"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="rounded-[18px] rounded-bl-sm border border-[#dbe6df] bg-[#f7fbf8] px-4 py-3">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-taawa-muted [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-taawa-muted [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-taawa-muted" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "What services do you offer?",
                "How does booking work?",
                "Is it confidential?",
                "Meet the counsellor",
              ].map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="flex items-center justify-between rounded-[18px] border border-[#dbe6df] bg-white px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-[#bfd8c7] hover:shadow-[0_10px_24px_rgba(23,37,42,0.06)]"
                >
                  <span className="text-sm font-semibold text-taawa-text">{question}</span>
                  <span className="text-taawa-green/70">↗</span>
                </button>
              ))}
            </div>

            <div className="sticky bottom-0 mt-5 border-t border-[#dbe6df] bg-[#f8fbf7] px-5 py-4">
              <div className="flex items-end gap-2 rounded-[20px] border border-[#cfded4] bg-white p-2 shadow-[0_8px_24px_rgba(23,37,42,0.05)]">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Taawa about services, sessions, or booking..."
                  rows={1}
                  className="max-h-24 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-taawa-text outline-none placeholder:text-taawa-muted/60"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-taawa-green text-white transition-all hover:bg-taawa-sage disabled:cursor-not-allowed disabled:opacity-40"
                >
                  →
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] leading-relaxed text-taawa-muted">
                Not a substitute for professional care. <a href="/crisis-support" className="underline">In crisis? Get help here.</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}