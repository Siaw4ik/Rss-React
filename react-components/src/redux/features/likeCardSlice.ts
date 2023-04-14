import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface likeCardState {
  likes: { id: number; isLike: boolean }[];
}

const initialState: likeCardState = {
  likes: [],
};

export const likeCardSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    setLike: (state, action: PayloadAction<{ id: number; isLike: boolean }[]>) => {
      state.likes = action.payload;
    },
  },
});

export const { setLike } = likeCardSlice.actions;

export default likeCardSlice.reducer;
