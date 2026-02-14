export type UserSummary = {
  id: string;
  username: string;
  status: "online" | "away" | "offline";
};

export type ChatMessage = {
  id: string;
  from: string;
  to?: string;
  text: string;
  sentAt: string;
  kind: "match" | "private" | "system";
};

export type ConversationPreview = {
  friend: string;
  lastMessage: string;
  updatedAt: string;
};

export type MatchState = {
  roomId?: string;
  partner?: string;
  status: "idle" | "waiting" | "matched";
};
