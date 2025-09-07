export type PostChatJoinParams = {
  roomId: number;
  userId: string;
  nickname: string;
  profileUrl: string;
  team: string;
};

export type ChatResponse = {
  id: number;
  roomId: number;
  userId: string;
  nickname: string;
  profileUrl: string;
  team: string;
};
