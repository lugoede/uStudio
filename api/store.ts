import { configureStore } from "@reduxjs/toolkit";
import { trendApi } from "./api-slice";

export const store = configureStore({
  reducer: {
    [trendApi.reducerPath]: trendApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(trendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
