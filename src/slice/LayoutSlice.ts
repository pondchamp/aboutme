import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DebugMode } from "@/util";

export enum LayoutAnimState {
  NOT_MOUNTED,
  MOUNT_STARTED,
  PROFILE_MOUNTED,
  CONTENT_MOUNT_READY,
  COMPLETED,
}

interface LayoutInitialState {
  layoutAnimState: LayoutAnimState;
}

const initialState: LayoutInitialState = {
  layoutAnimState: LayoutAnimState.NOT_MOUNTED,
};

export const LayoutSlice = createSlice({
  initialState,
  name: "layoutSlice",
  reducers: {
    SetLayoutAnimState: (state, action: PayloadAction<LayoutAnimState>) => {
      if (DebugMode) {
        console.log(`New anim state: ${LayoutAnimState[action.payload]}`);
      }
      state.layoutAnimState = action.payload;
    },
  },
});

export const { SetLayoutAnimState } = LayoutSlice.actions;
export default LayoutSlice.reducer;
