import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import snackbarSlice from "./slices/snackbarSlices";

export const store = configureStore({
  reducer: {
    // auth: reducer,
    snackbar: snackbarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});
