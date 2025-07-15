import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase/index";
import Gift from "@/types/Gift";
import List from "@/types/List";
import Present from "@/types/Present";

export async function addDocument(col: string, obj: Gift | List | Present) {
  try {
    const { id, ...objWithoutId } = obj;
    void id;

    const collectionRef = collection(db, col);
    const docRef = await addDoc(collectionRef, objWithoutId);

    return docRef.id;
  } catch (e) {
    throw e;
  }
}

export async function updateDocument(col: string, obj: Gift | List | Present) {
  try {
    const docRef = doc(db, col, obj.id as string);

    await updateDoc(docRef, { ...obj });

    return docRef.id;
  } catch (e) {
    throw e;
  }
}

export async function deleteDocument(col: string, objId: string) {
  try {
    const docRef = doc(db, col, objId);
    await deleteDoc(docRef);
  } catch (e) {
    throw e;
  }
}

export async function getDocuments(
  col: string,
  uid: string
): Promise<Gift[] | List[] | Present[]> {
  try {
    const collectionRef = collection(db, col);
    const q = query(collectionRef, where("uid", "==", uid));

    const docsSnap = await getDocs(q);

    if (col === "gifts") {
      return docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          listId: doc.data().listId,
          presentId: doc.data().presentId,
          sentBy: doc.data().sentBy,
          email: doc.data().email,
          phone: doc.data().phone,
          receipt: doc.data().receipt,
          sentAt: new Date(doc.data().sentAt.toMillis()),
          uid: doc.data().uid,
        } as Gift;
      });
    } else if (col == "lists") {
      return docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          code: +doc.data().code,
          title: doc.data().title,
          date: new Date(doc.data().date.toMillis()),
          pix: doc.data().pix,
          uid: doc.data().uid,
        } as List;
      });
    } else {
      return docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          listId: doc.data().listId,
          title: doc.data().title,
          description: doc.data().description,
          price: +doc.data().price,
          uid: doc.data().uid,
        } as Present;
      });
    }
  } catch {
    return [];
  }
}

export async function getPublicDocuments(code: number): Promise<{
  selectedList: List | null;
  listPresents: Present[];
}> {
  try {
    const q = query(collection(db, "lists"), where("code", "==", code));
    const docsSnap = await getDocs(q);

    const doc = docsSnap.docs[0];

    if (docsSnap.empty) {
      throw new Error("Lista não encontrada.");
    }

    const selectedList: List = {
      id: doc.id,
      code: +doc.data().code,
      title: doc.data().title,
      date: new Date(doc.data().date.toMillis()),
      pix: doc.data().pix,
      uid: doc.data().uid,
    };

    const qPresents = query(
      collection(db, "presents"),
      where("listId", "==", selectedList.id)
    );
    const presentsSnap = await getDocs(qPresents);

    const listPresents = presentsSnap.docs.map((doc) => {
      return {
        id: doc.id,
        listId: doc.data().listId,
        title: doc.data().title,
        description: doc.data().description,
        price: +doc.data().price,
        uid: doc.data().uid,
      } as Present;
    });

    return { selectedList, listPresents };
  } catch {
    return { selectedList: null, listPresents: [] };
  }
}
