import { useContext, useEffect, useRef, useState } from 'react';
import '../style/Tasks.scss'
import Task from './Task';

import { tasksContext } from '../contexts/tasksContext'

const Tasks = (props) => {
    const tasks = useContext(tasksContext);


    return (
        <div className="tasks">
            {Array.from(tasks).map((task, id) => {
                return <Task deleteTask={props.deleteTask} key={id} doneTask={props.doneTask} task={task} />;
            })}
        </div>
    )
}

export default Tasks;