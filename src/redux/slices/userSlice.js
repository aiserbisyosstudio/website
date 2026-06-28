import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  userPlan: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },
    setUserPlan: (state, action) => {
      state.userPlan = action.payload;
    },
    updateUserPlan: (state, action) => {
      if (state.userPlan) {
        Object.assign(state.userPlan, action.payload);
      }
    },
    updateUser: (state, action) => {
      if (state.profile) {
        Object.assign(state.profile, action.payload);
      }
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateUser, clearUser, setUserPlan, updateUserPlan } = userSlice.actions;

export default userSlice.reducer;