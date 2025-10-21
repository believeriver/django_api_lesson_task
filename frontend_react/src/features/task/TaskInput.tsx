import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import styles from './TaskInput.module.css';
import { Button } from '@mui/material';
import { type AppDispatch } from '../../app/store';

import {
  fetchAsyncCreate,
  fetchAsyncUpdate,
  editTask,
  selectEditedTask,
} from './taskSlice';

const TaskInput = () => {
  //dispatchによってアクションを実行し、stateを変更。
  // state変更後、再レンダリング。
  const dispatch = useDispatch<AppDispatch>();
  //storeから必要なデータを取り出すuseSelector
  const editedTask = useSelector(selectEditedTask);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editedTask.id === 0
      ? dispatch(editTask({ id: 0, title: e.target.value }))
      : dispatch(editTask({ id: editedTask.id, title: e.target.value }));
  };

  const isDisabled = editedTask.title.length === 0;

  const createClicked = () => {
    dispatch(fetchAsyncCreate(editedTask));
    dispatch(editTask({ id: 0, title: '' }));
  };

  const updateClicked = () => {
    console.log('[INFO] updateClicked in TaskInput.tsx')
    dispatch(fetchAsyncUpdate(editedTask));
    dispatch(editTask({ id: 0, title: '' }));
  };

  return (
    <div>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.title}
        onChange={handleInputChange}
        placeholder="Please input task"
      />
      <div className={styles.switch}>
        {editedTask.id === 0 ? (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={createClicked}
            color="primary"
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={updateClicked}
            color="primary"
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskInput;
