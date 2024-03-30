    import firebase from "firebase";
    import { db } from "./firebase";

    export const initGet = async (uid) => {
    const todo = await db
        .collection("todo")
        .orderBy("createdAt", "desc")
        .where("uid", "==", uid);

    return todo.get().then((snapShot) => {
        let todos = [];
        snapShot.forEach((doc) => {
        todos.push({
            id: doc.id,
            content: doc.data().content,
            isComplete: doc.data().isComplete,
        });
        });
        return todos;
    });
    };

    export const addTodo = async (content, uid) => {
    try {
        await db.collection("todo").add({
        content: content,
        uid: uid,
        isComplete: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
        console.error("Error adding todo:", error);
        throw error;
    }
    };

    export const todoDelete = (id) => {
    db.collection("todo").doc(id).delete();
    };

    export const toggleComple = async (id) => {
    const todo = await db.collection("todo").doc(id).get();
    return db.collection("todo").doc(id).update({
        isComplete: !todo.data().isComplete,
    });
    };

    export const fetchDataList = async () => {
    const querySnapshot = await db.collection("dataList").get();
    const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return data;
    };

    export const addDataItem = async (item) => {
    await db.collection("dataList").add(item);
    };

    export const deleteDataItem = async (itemId) => {
    await db.collection("dataList").doc(itemId).delete();
    };