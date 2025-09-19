import { ChatResponse, GetChatUserParams, PostChatJoinParams, PutChatUserParams } from "@/types/chat";
import { API_HOST } from "./host";
import { api } from "@/utils/api";

export function postChatJoin(params: PostChatJoinParams): Promise<ChatResponse> {
  return api.post(`${API_HOST}/chat/join`, params);
}

export function getChatUser(params: GetChatUserParams): Promise<ChatResponse> {
  return api.get(`${API_HOST}/chat/user`, { params });
}

export function putChatUser(params: PutChatUserParams): Promise<ChatResponse> {
  return api.put(`${API_HOST}/chat/user`, params);
}
