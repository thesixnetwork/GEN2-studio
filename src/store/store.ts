import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension'; // Import the composeWithDevTools function


import counter1Reducer from "./slices/counter1Slice";
import counter2Reducer from "./slices/counter2Slice";
import walletcounterReducer from "./slices/walletcounterSlice";

const reducer = {
  counter1Reducer,
  counter2Reducer,
  walletcounterReducer,
};

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
