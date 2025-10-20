// import React from 'react';

import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import styles from './TaskItem.module.css';
import { fetchAsyncDelete, selectTask, editTask } from './taskSlice';
import type { AppDispatch } from '../../app/store';

type Task = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li className={styles.listItem}>
      <span
        className={styles.cursor}
        onClick={() => dispatch(selectTask(task))}
      >
        {task.title}
      </span>
      <div>
        <button
          className={styles.taskIcon}
          onClick={() => dispatch(fetchAsyncDelete(task.id))}
        >
          <BsTrash />
        </button>

        <button
          className={styles.taskIcon}
          onClick={() => dispatch(editTask(task.id))}
        >
          <FaEdit />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
