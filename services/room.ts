import { GetRoomDetailParams, PostRoomParams, RoomResponse } from "@/types/room";
import axios, { AxiosResponse } from "axios";

export function postRoom(params: PostRoomParams): Promise<AxiosResponse<RoomResponse>> {
  return axios.post<RoomResponse>(`http://localhost:8000/room`, params);
}

export function getRoomDetail(params: GetRoomDetailParams): Promise<AxiosResponse<RoomResponse>> {
  return axios.get<RoomResponse>(`http://localhost:8000/room/${params.id}`);
}
