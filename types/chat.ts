export enum Team {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export type PostChatJoinParams = {
  roomId: number;
  userId: string;
  nickname: string;
  profileUrl: string;
  team: Team;
};

export type PutChatUserParams = PostChatJoinParams;

export type ChatResponse = {
  id: number;
  roomId: number;
  userId: string;
  nickname: string;
  profileUrl: string;
  team: Team;
};

export type GetChatUserParams = {
  roomId: number;
  userId: string;
};

export type GetChatLogsParams = {
  chatId: number;
  page?: number;
  size?: number;
};

export type GetChatLogsResponse = {
  chatId: number;
  message: string;
  team: Team;
  userId: string;
}[];