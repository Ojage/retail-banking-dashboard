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
  tagTypes: ["Account", "Transaction"],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getAnalyticsData: builder.query<AnalyticsData, void>({
      queryFn: async () => {
        try {
          const data = await fetchAnalyticsData();
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
    }),
    getAccounts: builder.query<Account[], void>({
      queryFn: async () => {
        try {
          const data = await fetchAccounts();
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM_ERROR", error: String(error) } };
        }
      },
      providesTags: ["Account"],
    }),
    getTransactions: builder.query<Transaction[], string>({
      queryFn: async (accountId) => {
        try {
          const data = await fetchTransactions(accountId);
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
      invalidatesTags: ["Account"],
    }),
  }),
});

export const {
  useGetAnalyticsDataQuery,
  useGetAccountsQuery,
  useGetTransactionsQuery,
  useSimulateTransferMutation,
} = bankingApi;
