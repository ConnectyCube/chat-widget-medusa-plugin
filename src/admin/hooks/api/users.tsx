import { FetchError } from "@medusajs/js-sdk"
import { AdminUser as MedusaAdminUser, HttpTypes, AdminStore } from "@medusajs/types"
import {
    QueryKey,
    UseQueryOptions,
    useQuery,
} from "@tanstack/react-query"
import { sdk } from "../../lib/config"
import { queryKeysFactory } from "../../lib/query-key-factory"

const USERS_QUERY_KEY = "users" as const
export const usersQueryKeys = {
    ...queryKeysFactory(USERS_QUERY_KEY),
    me: () => [USERS_QUERY_KEY, "me"],
}

export interface AdminUser extends MedusaAdminUser {
    store: AdminStore;
}

export interface AdminUserResponse {
    user: AdminUser;
}

export const useMe = (
    query?: HttpTypes.AdminUserParams,
    options?: UseQueryOptions<
        AdminUserResponse,
        FetchError,
        AdminUserResponse,
        QueryKey
    >
) => {
    const { data, ...rest } = useQuery({
        queryFn: () => sdk.admin.user.me(query) as Promise<AdminUserResponse>,
        queryKey: usersQueryKeys.me(),
        ...options,
    })

    return {
        ...data,
        ...rest,
    }
}