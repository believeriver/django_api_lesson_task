import styles from './App.module.css';

import { FaSignInAlt } from 'react-icons/fa';
import TaskList from './features/task/TaskList';
import TaskDetails from './features/task/TaskDetails';
import TaskInput from './features/task/TaskInput';
import Header from './features/login/Header';

function App() {
  //logout
  const Logout = () => {
    localStorage.removeItem('localJWT');
    window.location.href = '/';
  };

  return (
    <>
      {/* Task List Area(Left) */}
      <div className={styles.containerTasks}>
        <div className={styles.appTasks}>
          <button onClick={Logout} className={styles.signBtn}>
            <FaSignInAlt />
          </button>
          <Header />
          <TaskInput />
          <TaskList />
        </div>
        {/* Task Detail Area(Rigit) */}
        <div className={styles.appDetails}>
          <TaskDetails />
        </div>
      </div>
    </>
  );
}

export default App;
