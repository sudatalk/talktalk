export type PostRoomParams = {
  title: string;
  leftTeam: string;
  rightTeam: string;
  duration: number;
};

export type RoomResponse = {
  id: number;
  title: string;
  leftTeam: string;
  rightTeam: string;
  createdAt: string;
  expiredAt: string;
};

export type GetRoomDetailParams = {
  id: number;
};

export enum RoomStatus {
  OPEN = "open",
  CLOSED = "closed",
}

// 마크업을 위한 임시 타입
export type Room = {
  id: string;
  title: string;
  leftTeam: string;
  rightTeam: string;
  leftCount: number;
  rightCount: number;
  progress: number; // 0~1
  expiredAt?: string;
  status: RoomStatus;
};