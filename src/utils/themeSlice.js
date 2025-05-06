import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialTheme = Cookies.get('theme') || 'night';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: initialTheme,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      Cookies.set('theme', action.payload, { expires: 30 });
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;