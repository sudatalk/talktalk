import { getChatLogs } from "@/services/chat";
import { useInfiniteQuery } from "@tanstack/react-query";

type Props = {
  chatId: number;
  page?: number;
  size?: number;
};

const getChatLogsQueryKey = (props: Props) => ["GET_CHAT_LOGS", props];
const getChatLogsQueryFn = getChatLogs;

const useGetChatLogs = (props: Props) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: getChatLogsQueryKey(props),
    queryFn: ({ pageParam = 0 }) => getChatLogsQueryFn({
      ...props,
      size: props.size ?? 10,
      page: pageParam,
    }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
  const logs = data?.pages.flatMap((page) => page) ?? [];
  return { logs, fetchNextPage, hasNextPage, isFetchingNextPage };
};

export default useGetChatLogs;