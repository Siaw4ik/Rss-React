import * as toolkitRaw from '@reduxjs/toolkit';
export type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;

export interface likeCardState {
  likes: { id: number; isLike: boolean }[];
}

const initialState: likeCardState = {
  likes: [],
};

export const likeCardSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    setLike: (state, action: toolkitRaw.PayloadAction<{ id: number; isLike: boolean }[]>) => {
      state.likes = action.payload;
    },
  },
});

export const { setLike } = likeCardSlice.actions;

export default likeCardSlice.reducer;
