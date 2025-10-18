import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import type { AuthProps, ProfileProps } from '../types';

const apiUrl = 'http://127.0.0.1:8000/';
const token = localStorage.localJWT;

//API: login
export const fetchAsyncLogin = createAsyncThunk(
  'login/post',
  async (auth: AuthProps) => {
    try {
      const res = await axios.post(`${apiUrl}authen/jwt/create`, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log(
          '[ERROR]: fetchAsyncLogin: Server response:',
          err.response.data
        );
        alert(`サーバーエラーが発生しました: ${JSON.stringify(err.response.data)}`);
      }
      console.log('[ERROR]:fetchAsyncLogin:', err.message);
      alert(`エラーが発生しました: ${err.message}`);
    }
  }
);

export const fetchAsyncRegister = createAsyncThunk(
  'login/register',
  async (auth: AuthProps) => {
    try {
      const res = await axios.post(`${apiUrl}api/register/`, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log(
          '[ERROR]: fetchAsyncRegister: Server response:',
          err.response.data
        );
        alert(`サーバーエラーが発生しました: ${JSON.stringify(err.response.data)}`);
      }
      console.log('[ERROR]: fetchAsyncRegister: ', err.message);
      alert(`エラーが発生しました: ${err.message}`);
    }
  }
);

export const fetchAsyncProf = createAsyncThunk('login/get', async () => {
  try {
    const res = await axios.get(`${apiUrl}api/myself`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    if (err.response && err.response.data) {
      console.log(
        '[ERROR]: fetchAsyncProf: Server response:',
        err.response.data
      );
      alert(`サーバーエラーが発生しました: ${JSON.stringify(err.response.data)}`);
    }
    console.log('[ERROR]: fetchAsyncProf: ', err.message);
    alert(`エラーが発生しました: ${err.message}`);
  }
});

// Slice: called by dispatch.
const loginSlice = createSlice({
  name: 'login',
  initialState: {
    authen: {
      username: '',
      password: '',
    },
    isLoginView: true,
    profile: {
      id: 0,
      username: '',
    },
  },
  reducers: {
    editUsername(state, action) {
      state.authen.username = action.payload;
    },
    editPassword(state, action) {
      state.authen.password = action.payload;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem('localJWT', action.payload.access);
      action.payload.access && (window.location.href = '/tasks');
    });
    builder.addCase(fetchAsyncProf.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

//reducer
export const { editUsername, editPassword, toggleMode } = loginSlice.actions;
//enable them to connect from react components.
export const selectAuthen = (state: RootState) => state.login.authen;
export const selectIsLoginView = (state: RootState) => state.login.isLoginView;
export const selectProfile = (state: RootState) => state.login.profile;

export default loginSlice.reducer;
