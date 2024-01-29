import { AnyAction, configureStore, Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import layoutSlice from "@/slice/LayoutSlice";

export const reduxStore = configureStore({
  reducer: {
    layout: layoutSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export interface ReduxStoreProps {
  children: React.ReactNode;
  customStore?: Store<any, AnyAction>;
}

const ReduxStore = ({ customStore, children }: ReduxStoreProps) => (
  <Provider store={customStore || reduxStore}>{children}</Provider>
);

export default ReduxStore;
