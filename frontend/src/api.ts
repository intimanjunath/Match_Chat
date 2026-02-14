import type { ConversationPreview, UserSummary } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function searchUsers(username: string) {
  return request<string[]>(`/search/${encodeURIComponent(username)}`);
}

export function getFriendRequests() {
  return request<string[]>("/friendrequests");
}

export function getConversationPreviews() {
  return request<ConversationPreview[]>("/friends");
}

export const demoUsers: UserSummary[] = [
  { id: "1", username: "maya", status: "online" },
  { id: "2", username: "noah", status: "away" },
  { id: "3", username: "iris", status: "offline" }
];
