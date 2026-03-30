import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Minus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getFallbackResponse } from "@/lib/chatFallback";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const hasBackend = Boolean(import.meta.env.VITE_SUPABASE_URL);

const suggestedQuestions = [
  "What is FTTP?",
  "How is cost calculated?",
  "Which route is best?",
  "How to reduce cost?",
  "What is ARPU?",
  "Explain underground vs aerial",
];

const AIChatBot = () => {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Try backend first, fall back to client-side responses
    if (hasBackend) {
      let assistantSoFar = "";
      try {
        const resp = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: newMessages }),
        });

        if (!resp.ok || !resp.body) {
          throw new Error("Backend unavailable");
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";
        let streamDone = false;

        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;
          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") { streamDone = true; break; }

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (content) {
                assistantSoFar += content;
                setMessages(prev => {
                  const last = prev[prev.length - 1];
                  if (last?.role === "assistant") {
                    return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
                  }
                  return [...prev, { role: "assistant", content: assistantSoFar }];
                });
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }

        if (!assistantSoFar) throw new Error("Empty response");
        setIsLoading(false);
        return;
      } catch (e) {
        console.log("LLM backend unavailable, using fallback:", e);
        // Fall through to fallback below
      }
    }

    // Client-side fallback — always works
    const fallback = getFallbackResponse(text.trim());
    // Simulate typing effect
    let i = 0;
    const chunkSize = 8;
    const interval = setInterval(() => {
      i += chunkSize;
      const partial = fallback.slice(0, i);
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, idx) => idx === prev.length - 1 ? { ...m, content: partial } : m);
        }
        return [...prev, { role: "assistant", content: partial }];
      });
      if (i >= fallback.length) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 12);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          open ? "bg-muted-foreground/80 hover:bg-muted-foreground scale-90" : "bg-primary hover:bg-primary/90 scale-100 animate-pulse-glow"
        }`}
      >
        {open ? <X className="w-5 h-5 text-primary-foreground" /> : <MessageCircle className="w-5 h-5 text-primary-foreground" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className={`fixed bottom-24 right-5 z-50 w-[380px] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden transition-all duration-300 animate-fade-in ${minimized ? "max-h-[56px]" : "max-h-[520px]"}`}>
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-primary/5 flex items-center gap-2.5 cursor-pointer" onClick={() => minimized && setMinimized(false)}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">FTTP AI Assistant</p>
              {!minimized && <p className="text-[10px] text-muted-foreground">Ask anything about network planning & costs</p>}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); setMinimized(!minimized); }}
                className="w-7 h-7 rounded-full bg-muted/60 hover:bg-accent flex items-center justify-center transition-colors duration-200 cursor-pointer group"
                aria-label={minimized ? "Expand assistant" : "Minimize assistant"}
              >
                <Minus className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen(false); setMinimized(false); }}
                className="w-7 h-7 rounded-full bg-muted/60 hover:bg-destructive/15 flex items-center justify-center transition-colors duration-200 cursor-pointer group"
                aria-label="Close assistant"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground group-hover:text-destructive transition-colors duration-200" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[340px]">
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="flex gap-2 items-start">
                  <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    👋 Welcome to FTTP AI Assistant!{"\n\n"}
                    You can ask me about:{"\n"}
                    • How cost is calculated{"\n"}
                    • Which route is best{"\n"}
                    • How to reduce cost{"\n"}
                    • What is FTTP{"\n\n"}
                    Try clicking a suggestion below! 👇
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pl-8">
                  {suggestedQuestions.map((q) => (
                    <button key={q} onClick={() => sendMessage(q)}
                      className="text-left text-[11px] text-primary bg-primary/5 hover:bg-primary/10 rounded-lg px-2.5 py-1.5 transition-colors border border-primary/10">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 items-start ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                  msg.role === "user" ? "bg-info/10" : "bg-primary/10"
                }`}>
                  {msg.role === "user" ? <User className="w-3.5 h-3.5 text-info" /> : <Bot className="w-3.5 h-3.5 text-primary" />}
                </div>
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-info/10 text-foreground"
                    : "bg-muted/60 text-foreground"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-xs prose-neutral max-w-none [&_p]:m-0 [&_ul]:my-1 [&_li]:my-0 [&_h1]:text-sm [&_h2]:text-xs [&_h3]:text-xs [&_code]:text-[10px] [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_table]:text-[10px] [&_th]:px-2 [&_td]:px-2">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : msg.content}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-muted/60 rounded-xl px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestion chips after messages */}
          {messages.length > 0 && !isLoading && (
            <div className="px-3 pb-1 flex flex-wrap gap-1">
              {["Cost breakdown", "Best route?", "Reduce cost"].map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="text-[10px] text-primary bg-primary/5 hover:bg-primary/10 rounded-full px-2.5 py-1 border border-primary/10 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about FTTP costs..."
              disabled={isLoading}
              className="flex-1 text-sm bg-muted/50 text-foreground placeholder:text-muted-foreground rounded-lg px-3 py-2 border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:opacity-50"
            />
            <button type="submit" disabled={isLoading || !input.trim()}
              className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
