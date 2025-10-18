import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

const Login = () => {
  const state = useSelector((state: RootState) => state);
  console.log('[INFO]:Full Redux State:', JSON.stringify(state, null, 2));
  return <div>Login</div>;
};

export default Login;
