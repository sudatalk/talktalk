import { PostRoomParams, RoomResponse } from "@/types/room";
import axios, { AxiosResponse } from "axios";

export function postRoom(params: PostRoomParams): Promise<AxiosResponse<RoomResponse>> {
  return axios.post<RoomResponse>(`http://localhost:8000/room`, params);
}
