import { QueryObserverResult, UseQueryOptions as BaseUseQueryOptions, QueryKey, RefetchOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type Refetch<T> = (options?: RefetchOptions) => Promise<QueryObserverResult<T, AxiosError>>;

export type UseQueryOptions<T, K = T> = Omit<BaseUseQueryOptions<T, AxiosError, K, QueryKey>, "queryKey" | "queryFn">;
