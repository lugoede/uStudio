import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FashionItem } from "../src/components/fashiontrends";

interface ProductsResponse {
  title: string;
  link: string;
  image: string;
}

export const trendApi = createApi({
  reducerPath: "trend",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3331" }),
  endpoints: (builder) => ({
    getTrends: builder.query<ProductsResponse[], void>({
      query: () => "/fashiontrends",
    }),

    saveFavoriteTrend: builder.mutation<void, FashionItem>({
      query: (body) => ({
        url: "/profile",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetTrendsQuery, useSaveFavoriteTrendMutation } = trendApi;
