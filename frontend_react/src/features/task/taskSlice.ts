import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';
import type { TaskProps } from '../types';

const apiUrl = 'http://127.0.0.1:8000/';
const token = localStorage.localJWT;

//API :fetch task list
export const fetchAsyncGet = createAsyncThunk('task/get', async () => {
  try {
    const res = await axios.get(apiUrl, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    console.log('[INFO]:fetchAsyncGet in taskSlice:', res.data);
    return res.data;
  } catch (err: any) {
    console.log('[ERROR]:fetchAsyncGet in taskSlice:', err.message);
    alert(`[ERROR]:fetchAsyncGet in taskSlice:: ${err.message}`);
  }
});

//API: create task.
export const fetchAsyncCreate = createAsyncThunk(
  'task/post',
  async (task: TaskProps) => {
    try {
      const res = await axios.post(apiUrl, task, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      });
      console.log('[INFO]:fetchAsyncCreate in taskSlice:', res.data);
      return res.data;
    } catch (err: any) {
      console.log('[ERROR]:fetchAsyncCreate in taskSlice:', err.message);
      alert(`[ERROR]:fetchAsyncCreate in taskSlice:: ${err.message}`);
    }
  }
);

//API: update task.
export const fetchAsyncUpdate = createAsyncThunk(
  'task/put',
  async (task: TaskProps) => {
    try {
      const res = await axios.put(`${apiUrl}${task.id}`, task, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      });
      console.log('[INFO]:fetchAsyncUpdate in taskSlice:', res.data);
      return res.data;
    } catch (err: any) {
      console.log('[ERROR]:fetchAsyncUpdate in taskSlice:', err.message);
      alert(`[ERROR]:fetchAsyncUpdate in taskSlice:: ${err.message}`);
    }
  }
);

//API: deletetask.
export const fetchAsyncDelete = createAsyncThunk(
  'task/delete',
  async (id: number) => {
    try {
      const res = await axios.delete(`${apiUrl}${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      });
      console.log('[INFO]:fetchAsyncDelete in taskSlice:', res.data);
      return id;
    } catch (err: any) {
      console.log('[ERROR]:fetchAsyncDelete in taskSlice:', err.message);
      alert(`[ERROR]:fetchAsyncDelete in taskSlice:: ${err.message}`);
    }
  }
);

// Slice
const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [
      {
        id: 0,
        title: '',
        created_at: '',
        updated_at: '',
      },
    ],
    editedTask: {
      id: 0,
      title: '',
      created_at: '',
      updated_at: '',
    },
    selectedTask: {
      id: 0,
      title: '',
      created_at: '',
      updated_at: '',
    },
  },
  reducers: {
    editTask(state, action) {
      state.editedTask = action.payload;
    },
    selectTask(state, action) {
      state.selectedTask = action.payload;
    },
  },
  // fetch process
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
        selectedTask: action.payload,
      };
    });
    builder.addCase(fetchAsyncDelete.fulfilled, (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        selectedTask: { id: 0, title: '', created_at: '', updated_at: '' },
      };
    });
  },
});

//reducer
export const { editTask, selectTask} = taskSlice.actions;
//enable them to connect from react components.
export const selectSelectedTask = (state: RootState) => state.task.selectedTask;
export const selectEditedTask = (state: RootState) => state.task.editedTask;
export const selectTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
