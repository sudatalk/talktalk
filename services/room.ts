import { GetRoomDetailParams, PostRoomParams, RoomResponse } from "@/types/room";
import axios, { AxiosResponse } from "axios";
import { API_HOST } from "./host";

export function postRoom(params: PostRoomParams): Promise<AxiosResponse<RoomResponse>> {
  return axios.post<RoomResponse>(`${API_HOST}/room`, params);
}

export function getRoomDetail(params: GetRoomDetailParams): Promise<AxiosResponse<RoomResponse>> {
  return axios.get<RoomResponse>(`${API_HOST}/room/${params.id}`);
}
