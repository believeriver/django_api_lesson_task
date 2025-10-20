// import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { type AppDispatch } from '../../app/store';
import TaskItem from './TaskItem';
import styles from './TaskList.module.css';
import { fetchAsyncProf } from '../login/loginSlice';
import { selectTasks, fetchAsyncGet } from './taskSlice';
import { useEffect } from 'react';

const TaskList = () => {
  //dispatchによってアクションを実行し、stateを変更。state変更後、再レンダリング。
  const dispatch = useDispatch<AppDispatch>();
  //storeから必要なデータを取り出すuseSelector
  const tasks = useSelector(selectTasks);

  //コンポーネントのレンダリング後に実行したい処理
  //API通信、ログ出力、イベント登録・解除などの「副作用（side effect）」を行うとき
  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet());
      await dispatch(fetchAsyncProf());
    };
    fetchTaskProf();
  }, [dispatch]);

  return (
    <div>
      <ul className={styles.taskList}>
        {tasks.map((task) => {
          return <TaskItem key={task.id} task={task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
