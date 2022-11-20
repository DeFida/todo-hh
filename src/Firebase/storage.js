import { getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "../Firebase/firebase";

export async function getFile(filename) {
    return await getDownloadURL(ref(storage, filename));
}