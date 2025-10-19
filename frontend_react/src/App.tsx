import { useState } from 'react';
import styles from './App.module.css';

import { FaSignInAlt } from 'react-icons/fa';

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
        </div>
        {/* Task Detail Area(Rigit) */}
        <div className={styles.appDetails}></div>
      </div>
    </>
  );
}

export default App;
