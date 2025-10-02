import { QueryObserverResult, UseQueryOptions as BaseUseQueryOptions, UseInfiniteQueryOptions as BaseUseInfiniteQueryOptions, QueryKey, RefetchOptions, InfiniteData } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Refetch<T> = (options?: RefetchOptions) => Promise<QueryObserverResult<T, AxiosError>>;

export type UseQueryOptions<T, K = T> = Omit<BaseUseQueryOptions<T, AxiosError, K, QueryKey>, "queryKey" | "queryFn">;

export type UseInfiniteQueryOptions<T, K = T> = Omit<BaseUseInfiniteQueryOptions<T, AxiosError, InfiniteData<K>, QueryKey, number>, "queryKey" | "queryFn" | "getNextPageParam" | "initialPageParam">;
