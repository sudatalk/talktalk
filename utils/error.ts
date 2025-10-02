import { AxiosError } from "axios";

class DefaultError extends Error {
  status = 500;

  constructor(message = "알 수 없는 오류가 발생했습니다.") {
    super(message);
  }
}

export const getErrorData = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error;
  }

  return error as DefaultError;
};
