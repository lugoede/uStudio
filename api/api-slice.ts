import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const { useGetTrendsQuery } = trendApi;
