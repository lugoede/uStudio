import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ImageData {
  imageUrl: string;
  link: string | null;
}

interface CategoryData {
  category: string;
  images: ImageData[];
}

interface ProductsResponse {
  women: CategoryData;
  men: CategoryData;
}

export const trendApi = createApi({
  reducerPath: "trend",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getTrends: builder.query<ProductsResponse, void>({
      query: () => "/fashiontrends",
    }),
  }),
});

export const { useGetTrendsQuery } = trendApi;
