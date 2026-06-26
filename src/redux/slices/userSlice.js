import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },

    updateUser: (state, action) => {
      if (state.profile) {
        Object.assign(state.profile, action.payload);
      }
    },

    clearUser: () => initialState,
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;

export default userSlice.reducer;