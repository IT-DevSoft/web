import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        //baseUrl: "http://10.95.8.6:3030/api",
        baseUrl: "https://onlinestore.itdevsoft.ru:448/api",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState()).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Account", "Reading"],
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (body) => ({
                url: "user/sign_up",
                method: "POST",
                body,
            }),
        }),

        login: builder.mutation({
            query: (body) => ({
                url: "user/sign_in",
                method: "POST",
                body,
            }),
        }),

        deleteUserAccount: builder.mutation({
            query: () => ({
                url: "user/delete_account",
                method: "DELETE",
            }),
        }),

        confirm: builder.mutation({
            query: ({ login, code }) => ({
                url: `user/confirm?login=${login}&code=${code}`,
                method: "GET",
            }),
        }),

        sendCode: builder.mutation({
            query: ({ login, type }) => ({
                url: `user/send_code?login=${login}&type=${type}`,
                method: "GET",
            }),
        }),

        checkPhone: builder.mutation({
            query: ({ phone }) => ({
                url: `user/check_phone?phone=${phone}`,
                method: "GET",
            }),
        }),

        changePassword: builder.mutation({
            query: (body) => ({
                url: `user/change_password`,
                method: "POST",
                body,
            }),
        }),

        getProfile: builder.query({
            query: () => "user/profile",
        }),

        editEmail: builder.mutation({
            query: (email) => ({
                url: "user/edit_email",
                method: "POST",
                body: email,
            }),
        }),

        getAccounts: builder.query({
            query: () => "account",
            providesTags: (result) => {
                return result
                    ? [
                        ...result.map(({ id }) => ({ type: "Account", id })),
                        { type: "Account", id: "LIST" },
                    ]
                    : [{ type: "Account", id: "LIST" }];
            },
        }),

        getAccount: builder.mutation({
            query: (account) => `account/detail?accountNumber=${account}`,
        }),

        checkAccount: builder.mutation({
            query: (account) => `account/exists?accountNumber=${account}`,
        }),

        addAccount: builder.mutation({
            query: (account) => ({
                url: "account/add",
                method: "POST",
                body: account,
            }),
            invalidatesTags: [{ type: "Account", id: "LIST" }],
        }),

        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `account/delete?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Account", id }],
        }),

        makePay: builder.mutation({
            query: (form) => ({
                url: "account/pay",
                method: "POST",
                body: form,
            }),
        }),

        getPayments: builder.query({
            query: (id) => `account/payments?id=${id}`,
        }),

        getAccruals: builder.query({
            query: (id) => `account/accruals?id=${id}`,
        }),

        getMeteringDevices: builder.query({
            query: (id) => `account/metering_devices?id=${id}`,
        }),

        getMeterReadings: builder.query({
            query: (id) => `/account/meter_readings?id=${id}`,
            providesTags: (result) => {
                return result
                    ? [
                        ...result.map(({ id }) => ({ type: "Reading", id })),
                        { type: "Reading", id: "LIST" },
                    ]
                    : [{ type: "Reading", id: "LIST" }];
            },
        }),

        setMeterReadings: builder.mutation({
            query: ({ id, consumption }) => ({
                url: `/account/meter_readings?id=${id}&consumption=${consumption}`,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Reading", id: "LIST" }],
        }),
    }),
});

export const {
    useCheckAccountMutation,
    useLoginMutation,
    useGetAccountsQuery,
    useAddAccountMutation,
    useDeleteAccountMutation,
    useGetProfileQuery,
    useGetAccountMutation,
    useGetPaymentsQuery,
    useGetAccrualsQuery,
    useGetMeteringDevicesQuery,
    useMakePayMutation,
    useGetMeterReadingsQuery,
    useSignUpMutation,
    useConfirmMutation,
    useSendCodeMutation,
    useCheckPhoneMutation,
    useChangePasswordMutation,
    useSetMeterReadingsMutation,
    useDeleteUserAccountMutation,
    useEditEmailMutation
} = api;
