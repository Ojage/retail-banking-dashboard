import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  fetchAccounts,
  fetchAnalyticsData,
  fetchTransactions,
  submitTransfer,
} from "@/services/mockBankingService";
import type { Account, AnalyticsData, Transaction, TransferPayload, TransferResult } from "@/types";

export const bankingApi = createApi({
  reducerPath: "bankingApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Account", "Transaction", "Analytics"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getAnalyticsData: builder.query<AnalyticsData, void>({
      queryFn: () => {
        try {
          const data = fetchAnalyticsData();
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      providesTags: ["Analytics"],
    }),
    getAccounts: builder.query<Account[], void>({
      queryFn: () => {
        try {
          const data = fetchAccounts();
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      providesTags: ["Account"],
    }),
    getTransactions: builder.query<Transaction[], string>({
      queryFn: (accountId) => {
        try {
          const data = fetchTransactions(accountId);
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      providesTags: (_result, _err, accountId) => [{ type: "Transaction", id: accountId }],
    }),
    simulateTransfer: builder.mutation<TransferResult, TransferPayload>({
      queryFn: async (payload) => {
        try {
          const data = await submitTransfer(payload);
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      invalidatesTags: ["Account", "Analytics"],
    }),
  }),
});

export const {
  useGetAnalyticsDataQuery,
  useGetAccountsQuery,
  useGetTransactionsQuery,
  useSimulateTransferMutation,
} = bankingApi;
