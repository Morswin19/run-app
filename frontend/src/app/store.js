import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import runReducer from '../features/runs/runSlice'
import goalReducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    runs: runReducer,
    goals: goalReducer
  },
});
