import { removeTask, updateDescription, updateTitle } from '../Firebase/firestore';
import { useContext, useEffect, useRef, useState } from 'react';
import '../style/Tasks.scss'
import DownloadLink from "react-download-link";

import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const Task = (props) => {

    const [task, setTask] = useState({})

    const [done, setDone] = useState(props.task.done);

    const titleRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        setTask({ ...props.task, date: dayjs.unix(props.task.date.seconds) })
    }, [])

    function changeTitle() {
        const title = titleRef.current.value;
        updateTitle(task.id, title)
    }

    function changeDescription() {
        const description = descriptionRef.current.value;
        updateDescription(task.id, description)
    }

    function deleteTask() {
        props.deleteTask(task.id)
    }

    function doneTask() {
        setDone(true);
        props.doneTask(task.id)
    }


    return (
        <>{task.title ?

            <div className="task">
                <input type="text" className='task__input' defaultValue={task.title} ref={titleRef} onInput={changeTitle} />
                <textarea type="text" className='task__description' defaultValue={task.description} rows={2} ref={descriptionRef} onInput={changeDescription}></textarea>
                <div className='task__wrapper'>
                    <p className='task__date-label'>Дата и время завершения:</p>

                    <p className={`task__date ${dayjs.unix(props.task.date.seconds).diff(new Date()) < 0 ? 'task__date_passed' : 'task__date_not-passed'}`}>{task.date.get('date')}-{task.date.get('month')}-{task.date.get('year')}  {task.date.get('hour')}:{task.date.get('minute')}</p>
                </div>

                <div className='task__wrapper'>
                    <p className={`task__status ${done && 'task__status_green'}`}>Статус: {done ? 'Выполнено' : 'Не выполнено'}</p>
                </div>

                <a href={task.fileUrl} className="task__file" download>Открыть файл</a>

                <div className='task__buttons'>
                    <button className='task__button' onClick={deleteTask}>Удалить</button>
                    {!done && <button className='task__button task__button_done' onClick={doneTask}>Выполнено</button>}
                    
                </div>
            </div>
            :
            <p>Wait!</p>
        }

        </>
    )
}

export default Task;