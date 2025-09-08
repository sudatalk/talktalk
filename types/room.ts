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
