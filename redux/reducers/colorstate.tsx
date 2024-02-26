import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  grcnt: 0,
  grconcnt: 0,
  grtconcnt: 0,
  blcnt: 0,
  blconcnt: 0,
  bltconcnt: 0,
};

const Colorstate = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setcolor: (state, action) => {
      console.log("redux", action.payload);
      state.grcnt = action.payload.grcnt;
      state.grconcnt = action.payload.grconcnt;
      state.grtconcnt = action.payload.grtconcnt;
      state.blcnt = action.payload.blcnt;
      state.blconcnt = action.payload.blconcnt;
      state.bltconcnt = action.payload.bltconcnt
    },
  },
});

export const { setcolor } = Colorstate.actions;
export default Colorstate.reducer;