import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";




type WalletcounterState = {
  cosmosbalance: number;
  loading: boolean;
  isloggin: boolean;
  cosmosaddress: string;
};

const initialValues: WalletcounterState = {
  cosmosbalance: 0,
  loading: false,
  isloggin: false,
  cosmosaddress: "",
};

export const buttonHandlerKeplrConnect = createAsyncThunk(
  "walletcounter/setValueAsync",
  async (value: number) => {
    const job = new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        if (value >= 0) {
          resolve(value);
        } else {
          reject(Error(""));
        }
      }, 1000);
    });

    return await job;
  }
  
);

const walletcounterSlice = createSlice({
  name: "walletcounter",
  initialState: initialValues,
  reducers: {
    setisloggin: (state: WalletcounterState,action) => {
      state.isloggin = action.payload;
    },
    setBalance :(state: WalletcounterState,action)=>{
      state.cosmosbalance=action.payload
    }
    ,
    setAddress :(state: WalletcounterState,action)=>{
      state.cosmosaddress=action.payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(setValueAsync.fulfilled, (state, action) => {
    //   // state.counter = action.payload;
    //   state.loading = false;

    // });

    // builder.addCase(setValueAsync.rejected, (state, action) => {

    //   state.loading = false;

    // });

    // builder.addCase(setValueAsync.pending, (state, action) => {
    //   state.loading = true;

    // });
  },
});

export const { setisloggin,setBalance,setAddress } = walletcounterSlice.actions;
export const walletcounterSelector = (store: RootState) => store.walletcounterReducer;
export default walletcounterSlice.reducer;
