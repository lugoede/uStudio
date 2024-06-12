import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://asos2.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        "3a2d6f6293msh0814b616f9d52e1p10f093jsnab789579058a"
      );
      headers.set("x-rapidapi-host", "asos2.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: "/products/v2/list",
        params,
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
