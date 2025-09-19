import { GetRoomDetailParams, PostRoomParams, RoomResponse } from "@/types/room";
import axios, { AxiosResponse } from "axios";
import { API_HOST } from "./host";
import { api } from "@/utils/api";

export function postRoom(params: PostRoomParams): Promise<AxiosResponse<RoomResponse>> {
  return api.post<RoomResponse>(`${API_HOST}/room`, params);
}

export function getRoomDetail(params: GetRoomDetailParams): Promise<AxiosResponse<RoomResponse>> {
  return api.get<RoomResponse>(`${API_HOST}/room/${params.id}`);
}

export function getRoomList(): Promise<RoomResponse[]> {
  return api.get(`${API_HOST}/room`);
}
