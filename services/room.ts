import { GetRoomDetailParams, PostRoomParams, RoomResponse } from "@/types/room";
import { API_HOST } from "./host";
import { api } from "@/utils/api";

export function postRoom(params: PostRoomParams): Promise<RoomResponse> {
  return api.post(`${API_HOST}/room`, params);
}

export function getRoomDetail(params: GetRoomDetailParams): Promise<RoomResponse> {
  return api.get(`${API_HOST}/room/${params.id}`);
}

export function getRoomList(): Promise<RoomResponse[]> {
  return api.get(`${API_HOST}/room`);
}
