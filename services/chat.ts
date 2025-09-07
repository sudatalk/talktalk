import { ChatResponse, PostChatJoinParams } from "@/types/chat";
import axios, { AxiosResponse } from "axios";

export function postChatJoin(params: PostChatJoinParams): Promise<AxiosResponse<ChatResponse>> {
  return axios.post<ChatResponse>(`http://localhost:8000/chat/join`, params);
}
