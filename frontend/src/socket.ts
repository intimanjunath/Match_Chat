import { io, Socket } from "socket.io-client";
import type { ChatMessage } from "./types";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:3000";

export function createChatSocket(token: string): Socket {
  return io(SOCKET_URL, {
    query: { token },
    transports: ["websocket", "polling"]
  });
}

export function formatMessage(text: string, from: string, kind: ChatMessage["kind"]): ChatMessage {
  return {
    id: crypto.randomUUID(),
    from,
    text,
    kind,
    sentAt: new Date().toISOString()
  };
}
