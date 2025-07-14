import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
  },
  reducers: {
    setPosts(state, action) {
      state.items = action.payload;
    },
    addOptimisticPost(state, action) {
      state.items.unshift(action.payload); // Add to start of list
    },
    updatePost(state, action) {
      const idx = state.items.findIndex(p => p.$id === action.payload.$id);
      if (idx !== -1) {
        state.items[idx] = action.payload;
      }
    },
    removePost(state, action) {
      state.items = state.items.filter(p => p.$id !== action.payload);
    },
    replaceOptimisticPost(state, action) {
      // action.payload: { tempId, realPost }
      const idx = state.items.findIndex(p => p.$id === action.payload.tempId);
      if (idx !== -1) {
        state.items[idx] = action.payload.realPost;
      }
    },
  },
});

export const { setPosts, addOptimisticPost, updatePost, removePost, replaceOptimisticPost } = postsSlice.actions;
export default postsSlice.reducer; 