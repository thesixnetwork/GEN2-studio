import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type schemaInfoState = {
  schemaInfo: any;
  loading: boolean;
};

const initialValues: schemaInfoState = {
  schemaInfo: {},
  loading: false,
};

export const setValueAsync = createAsyncThunk(
  "schemaInfo/setValueAsync",
  async (value: number) => {
    const job = new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        if (value >= 0) {
          resolve(value);
        } else {
          reject(Error(""));
        }
      }, 2000);
    });

    return await job;
  }
);

const counter1Slice = createSlice({
  name: "counter1",
  initialState: initialValues,
  reducers: {
    increase: (state: Counter1State) => {
      state.counter = state.counter + 1;
      console.log(state.counter)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setValueAsync.fulfilled, (state, action) => {
      state.counter = action.payload;
      state.loading = false;
    });

    builder.addCase(setValueAsync.rejected, (state) => {
      state.counter = 0;
      state.loading = false;
    });

    builder.addCase(setValueAsync.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { increase } = counter1Slice.actions;
export const counter1Selector = (store: RootState) => store.counter1Reducer;
export default counter1Slice.reducer;
