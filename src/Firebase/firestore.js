import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from './firebase';
import { getFile } from "./storage";

const TASK_COLLECTION = "tasks";

export function addTaskF(title, description, date, filename) {
    return addDoc(collection(db, TASK_COLLECTION), { title, description, date, filename, done: false })
}

export async function checkTask(id) {
    await updateDoc(doc(db, TASK_COLLECTION, id), {
        done: true
    })
}

export async function getTask(id) {
    const docit = (await getDoc(doc(db, TASK_COLLECTION, id)));
    const task = docit.data();
    console.log(task);
    task.fileUrl = await getFile(task["filename"]);
    task.id = docit.id;
    return task;
}

export async function getTasks() {
    const tasks = query(collection(db, TASK_COLLECTION), orderBy("date", "desc"));
    const querySnapshot = await getDocs(tasks);
    let allTasks = []

    for (const documentSnapshot of querySnapshot.docs) {
        const task = documentSnapshot.data();
        await allTasks.push({
            ...task,
            id: documentSnapshot.id,
            fileUrl: await getFile(task["filename"]),
        })
    }

    return allTasks;
}

export async function updateTitle(id, title) {
    await updateDoc(doc(db, TASK_COLLECTION, id), {
        title: title
    })

}

export async function updateDescription(id, description) {
    await updateDoc(doc(db, TASK_COLLECTION, id), {
        description: description
    })
}

export async function removeTask(id) {
    await deleteDoc(doc(db, TASK_COLLECTION, id))
}