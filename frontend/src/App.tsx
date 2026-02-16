import { useMemo, useState } from "react";
import { demoUsers } from "./api";
import type { ChatMessage, MatchState } from "./types";

const initialMessages: ChatMessage[] = [
  {
    id: "system-1",
    from: "System",
    text: "Waiting for a random match...",
    sentAt: new Date().toISOString(),
    kind: "system"
  },
  {
    id: "match-1",
    from: "maya",
    text: "Hey, matched from the queue.",
    sentAt: new Date().toISOString(),
    kind: "match"
  }
];

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [match, setMatch] = useState<MatchState>({
    roomId: "room-42",
    partner: "maya",
    status: "matched"
  });

  const onlineCount = useMemo(
    () => demoUsers.filter((user) => user.status === "online").length,
    []
  );

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        from: "you",
        text,
        sentAt: new Date().toISOString(),
        kind: "match"
      }
    ]);
    setDraft("");
  }

  function resetMatch() {
    setMatch({ status: "waiting" });
    setMessages([
      {
        id: crypto.randomUUID(),
        from: "System",
        text: "Searching for the next available chat partner.",
        sentAt: new Date().toISOString(),
        kind: "system"
      }
    ]);
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Realtime Match Chat</p>
          <h1>Socket-first social chat</h1>
          <p className="summary">
            Random matching, friend requests, private messages, and MongoDB-backed
            conversations behind a typed React dashboard.
          </p>
        </div>

        <section className="metric-grid" aria-label="chat metrics">
          <div>
            <span>{onlineCount}</span>
            <p>online</p>
          </div>
          <div>
            <span>{messages.length}</span>
            <p>messages</p>
          </div>
        </section>

        <section>
          <h2>Friends</h2>
          <div className="friend-list">
            {demoUsers.map((user) => (
              <button key={user.id} className="friend-row">
                <span className={`status ${user.status}`} />
                <span>{user.username}</span>
                <small>{user.status}</small>
              </button>
            ))}
          </div>
        </section>
      </aside>

      <section className="chat-panel">
        <header className="chat-header">
          <div>
            <p className="eyebrow">Random match</p>
            <h2>{match.partner ?? "Finding partner"}</h2>
          </div>
          <button onClick={resetMatch}>New match</button>
        </header>

        <div className="message-list">
          {messages.map((message) => (
            <article key={message.id} className={`message ${message.from === "you" ? "mine" : ""}`}>
              <strong>{message.from}</strong>
              <p>{message.text}</p>
            </article>
          ))}
        </div>

        <form
          className="composer"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type a realtime message"
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </main>
  );
}

export default App;
