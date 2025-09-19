import { ChatResponse, GetChatUserParams, PostChatJoinParams, PutChatUserParams } from "@/types/chat";
import axios, { AxiosResponse } from "axios";
import { API_HOST } from "./host";

export function postChatJoin(params: PostChatJoinParams): Promise<AxiosResponse<ChatResponse>> {
  return axios.post<ChatResponse>(`${API_HOST}/chat/join`, params);
}

export function getChatUser(params: GetChatUserParams): Promise<AxiosResponse<ChatResponse>> {
  return axios.get<ChatResponse>(`${API_HOST}/chat/user`, { params });
}

export function putChatUser(params: PutChatUserParams): Promise<AxiosResponse<ChatResponse>> {
  return axios.put<ChatResponse>(`${API_HOST}/chat/user`, params);
}
