import { FetchError } from "@medusajs/js-sdk"
import { HttpTypes } from "@medusajs/types"
import { queryKeysFactory } from "../../lib/query-key-factory"
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { sdk } from "../../lib/config";

const STORE_QUERY_KEY = "store" as const
export const storeQueryKeys = queryKeysFactory(STORE_QUERY_KEY)

/**
 * Workaround to keep the V1 version of retrieving the store.
 */
export async function retrieveActiveStore(
    query?: HttpTypes.AdminStoreParams
  ): Promise<HttpTypes.AdminStoreResponse> {
    const response = await sdk.admin.store.list(query)
  
    const activeStore = response.stores?.[0]
  
    if (!activeStore) {
      throw new FetchError("No active store found", "Not Found", 404)
    }
  
    return { store: activeStore }
}

export const useStore = (
    query?: HttpTypes.SelectParams,
    options?: Omit<
      UseQueryOptions<
        HttpTypes.AdminStoreResponse,
        FetchError,
        HttpTypes.AdminStoreResponse,
        QueryKey
      >,
      "queryFn" | "queryKey"
    >
  ) => {
    const { data, ...rest } = useQuery({
      queryFn: () => retrieveActiveStore(query),
      queryKey: storeQueryKeys.details(),
      ...options,
    })
  
    return {
      ...data,
      ...rest,
    }
  }