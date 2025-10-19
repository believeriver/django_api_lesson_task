import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type AppDispatch, type RootState } from '../../app/store';
import styles from './Login.module.css';

import {
  editUsername,
  editPassword,
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  selectIsLoginView,
} from './loginSlice';
import { Button } from '@mui/material';

const Login = () => {
  // check state data.--------------------------------------
  // const state = useSelector((state: RootState) => state);
  // console.log('[INFO]:Full Redux State:', JSON.stringify(state, null, 2));
  // -------------------------------------------------------

  const dispatch = useDispatch<AppDispatch>();
  const authen = useSelector(selectAuthen);
  const isLoginView = useSelector(selectIsLoginView);
  const btnDisabler = authen.username === '' || authen.password === '';

  // login function
  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(authen));
    } else {
      const result = await dispatch(fetchAsyncRegister(authen))
      if (fetchAsyncRegister.fulfilled.match(result)){
        await dispatch(fetchAsyncLogin(authen))
      }
    }
  }

  return (
    <div>
      <div className={styles.containerLogin}>
        <div className={styles.appLogin}>
          <h1>{isLoginView ? 'Login' : 'Register'}</h1>
          <span>Username</span>
          <input
            type="text"
            className={styles.inputLog}
            name="username"
            placeholder=""
            onChange={(e) => dispatch(editUsername(e.target.value))}
            required
          />
          <span>Password</span>
          <input
            type="password"
            className={styles.inputLog}
            name="password"
            placeholder=""
            onChange={(e) => dispatch(editPassword(e.target.value))}
            required
          />
          <div className={styles.switch}>
            <Button
              variant='contained'
              disabled={btnDisabler}
              color='primary'
              onClick={login}
            >
              {isLoginView ? "Login" : "Create"}
            </Button>
          </div>
          <span
            className={styles.switchText}
            onClick={() => dispatch(toggleMode())}
          >
            {isLoginView ? "Create Account ?" : "Back to Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
