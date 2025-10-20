// import React from 'react'
import { useSelector } from "react-redux"

import styles from "./TaskDetails.module.css"
import { selectSelectedTask } from "./taskSlice"


const TaskDetails = () => {
  const selectedTask = useSelector(selectSelectedTask)
  return (
    <div className={styles.details}>
      {selectedTask && (
        <>
          <h2>{selectedTask.title}</h2>
          <p>Created at</p>
          <h3>{selectedTask.created_at}</h3>
          <p>Updated at</p>
          <h3>{selectedTask.updated_at}</h3>
        </>
      )}
    </div>
  )
}

export default TaskDetails