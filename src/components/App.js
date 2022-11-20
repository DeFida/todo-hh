import { useEffect, useState } from 'react';
import '../style/App.scss';

import CreateCard from './CreateCard'

import { storage } from "../Firebase/firebase" // - импорт storage из созданного нами файла firebase

import {
  ref, uploadBytesResumable,
} from "firebase/storage" // - необходимые функции для обработки данных и взаимодействия с firestore

import { addTaskF, getTasks, getTask, removeTask, checkTask } from '../Firebase/firestore'; // - собственные функции для обработки данных
import Tasks from './Tasks'; // - компонент Tasks

import { tasksContext } from "../contexts/tasksContext"; // - контекст для хранения данных в интерфейсной части сайта

function App() {
  const [toAdd, setToAdd] = useState(false) // - стейт для формы добавления задачи
  const [tasks, setTasks] = useState([]) // - стейт для задач
  const [log, setLog] = useState('Wait...')

  async function addTask(data) { // - функция добавления задачи
    const STORAGE_BUCKET_URL = 'gs://todo-test-hh.appspot.com'; // - константа firestore url 
    const bucket = `${STORAGE_BUCKET_URL}/files/${data.uploadedFile.name}` // -  путь файла

    const thefileRef = ref(storage, bucket) // - создаем реф для файла в storage
    const uploadFile = uploadBytesResumable(thefileRef, data.uploadedFile); // - функция загрузки файла
    addTaskF(data.title, data.description, data.dateTime, bucket)
      .then(async (res) => {
        const task = await getTask(res['_key']['path']['segments'][1]);
        setTasks([...tasks, task]);
        setToAdd(false);
      });
  }

  useState(async () => { // - useEffect для получения данных о задач
    const tasks = await getTasks()
    if (tasks.length === 0) {
      setLog('Нет задач, добавьте первую задачу')
    }
    setTasks(tasks);
  }, [])

  function deleteTask(id) { // - удаление задачи
    removeTask(id);
    setTasks(Array.from(tasks).filter((e) => e.id !== id))
  }

  function doneTask(id) { // - завершение задачи
    checkTask(id);
  }

  return (
    <div className="app">
      {/* Все задачи */}
      <tasksContext.Provider value={tasks}> 
      {/* Если есть какая либо задача то рендерим Tasks, а если нет то рендерим слово wait... */}
        {tasks.length === 0 ? <p className='app__wait'>{log}</p> : <Tasks deleteTask={deleteTask} doneTask={doneTask} />}
        {toAdd ? <CreateCard addTask={addTask} /> : <button className='app__add' onClick={() => setToAdd(true)}>Добавить задачу</button>}
      </tasksContext.Provider>
    </div>
  );
}

export default App;
