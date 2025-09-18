import { ChatResponse, PostChatJoinParams } from "@/types/chat";
import axios, { AxiosResponse } from "axios";
import { API_HOST } from "./host";

export function postChatJoin(params: PostChatJoinParams): Promise<AxiosResponse<ChatResponse>> {
  return axios.post<ChatResponse>(`${API_HOST}/chat/join`, params);
}
