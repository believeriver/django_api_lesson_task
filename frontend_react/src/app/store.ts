import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import taskReducer from '../features/task/taskSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    task: taskReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch