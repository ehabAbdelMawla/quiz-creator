import { configureStore } from "@reduxjs/toolkit";
import quizesSlice from "./slices/quizes";

const store = configureStore({
  reducer: {
    quizes: quizesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type AppState = ReturnType<typeof store.getState>;
