import { Team } from "@/types/chat";

export const JOIN_TALK_FORM_DEFAULT_VALUES = {
  isEditMode: false,
  profileUrl: "",
  nickname: "",
  team: "" as Team,
};

export const JOIN_TALK_FORM_PATH = {
  IS_EDIT_MODE: "isEditMode",
  PROFILE_IMAGE_URL: "profileUrl",
  NICKNAME: "nickname",
  TEAM: "team",
};
