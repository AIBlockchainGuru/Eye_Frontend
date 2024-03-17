import { createSlice } from "@reduxjs/toolkit";

export const DesignerProfileSlice = createSlice({
  name: "DesignerProfileData",
  initialState: {
    profileImage: null,
    coverImage: null,
  },
  reducers: {
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setCoverImage: (state, action) => {
      state.coverImage = action.payload;
    },
  },
});

export const { setProfileImage, setCoverImage } = DesignerProfileSlice.actions;

export default DesignerProfileSlice.reducer;
