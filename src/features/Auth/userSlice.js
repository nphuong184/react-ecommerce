import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
// import { stringify } from 'query-string';
import StorageKeys from 'constants/storage-key';

export const register = createAsyncThunk('user/register', async (payload) => {
  // call api to register
  const data = await userApi.register(payload);
  // save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
  // call api to register
  const data = await userApi.login(payload);
  // save data to local storage
  localStorage.setItem('access_token', data.jwt);
  localStorage.setItem('user', JSON.stringify(data.user));

  // return user data
  return data.user;
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});
const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer; // default export
