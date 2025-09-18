export type PostRoomParams = {
  title: string;
  leftTeam: string;
  rightTeam: string;
  duration: number;
};

export enum RoomStatus {
  ON = "ON",
  OFF = "OFF",
}

export type RoomResponse = {
  id: number;
  title: string;
  leftTeam: string;
  rightTeam: string;
  createdAt: string;
  expiredAt: string;
  leftCount: number;
  rightCount: number;
  status: RoomStatus;
};

export type GetRoomDetailParams = {
  id: number;
};
