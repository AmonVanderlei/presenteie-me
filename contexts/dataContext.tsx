"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import List from "@/types/List";
import Gift from "@/types/Gift";
import { AuthContext } from "./authContext";
import Present from "@/types/Present";
import {
  addDocument,
  deleteDocument,
  getDocuments,
  getPublicDocuments,
  updateDocument,
} from "@/utils/data";
import { toast, ToastContentProps } from "react-toastify";

export interface DataContextType {
  userLists: List[];
  gifts: Gift[];
  presents: Present[];
  publicList: List | null | undefined;
  presentsPublicList: Present[];
  fetchPublicList: (code: number) => Promise<void>;
  addObj: (obj: List | Gift | Present) => Promise<void>;
  updateObj: (obj: List | Gift | Present) => Promise<void>;
  deleteObj: (obj: List | Gift | Present) => Promise<void>;
}

export const DataContext = createContext<DataContextType | null>(null);

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext must be used within a AuthContextProvider");

  const { user, messages } = authContext;

  const [userLists, setUserLists] = useState<List[]>([]);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [presents, setPresents] = useState<Present[]>([]);
  const [publicList, setPublicList] = useState<List | null | undefined>(null);
  const [presentsPublicList, setPresentsPublicList] = useState<Present[]>([]);

  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      const userListsData = (await getDocuments("lists", user.uid)) as List[];
      const userGiftsData = (await getDocuments("gifts", user.uid)) as Gift[];
      const userPresentsData = (await getDocuments(
        "presents",
        user.uid
      )) as Present[];

      setUserLists(userListsData);
      setGifts(userGiftsData);
      setPresents(userPresentsData);
    } catch {
      toast.error(messages.error.firebase);
    }
  }, [user, messages]);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user, fetchUserData]);

  const fetchPublicList = useCallback(
    async (code: number) => {
      try {
        const { selectedList, listPresents } = await getPublicDocuments(code);

        setPublicList(selectedList);
        setPresentsPublicList(listPresents);

        if (!selectedList) {
          toast.warning("Desculpe! Lista não encontrada.");
          setPublicList(undefined);
        }
      } catch (error) {
        toast.error(messages.error.firebase + error);
      }
    },
    [messages]
  );

  async function addObj(obj: List | Gift | Present) {
    if ("code" in obj) {
      // Add to firebase
      const newId = await toast.promise(addDocument("lists", obj), {
        pending: messages.loading.add,
        success: messages.success.add,
        error: messages.error.something,
      });

      // Add locally
      setUserLists((prev) => [...prev, { ...obj, id: newId } as List]);
    } else if ("title" in obj) {
      // Add to firebase
      const newId = await toast.promise(addDocument("presents", obj), {
        pending: messages.loading.add,
        success: messages.success.add,
        error: messages.error.something,
      });

      // Add locally
      setPresents((prev) => [...prev, { ...obj, id: newId } as Present]);
    } else {
      // Add to firebase
      const newId = await toast.promise(addDocument("gifts", obj), {
        pending: messages.loading.add,
        success: messages.success.add,
        error: messages.error.something,
      });

      // Add locally
      setGifts((prev) => [...prev, { ...obj, id: newId } as Gift]);
    }
  }

  async function updateObj(obj: List | Gift | Present) {
    if ("code" in obj) {
      // Update on firebase
      toast.promise(updateDocument("lists", obj), {
        pending: messages.loading.update,
        success: messages.success.update,
        error: messages.error.something,
      });

      // Update locally
      setUserLists((prev) =>
        prev.map((item) => (item.id === obj.id ? { ...item, ...obj } : item))
      );
    } else if ("title" in obj) {
      // Update on firebase
      toast.promise(updateDocument("presents", obj), {
        pending: messages.loading.update,
        success: messages.success.update,
        error: messages.error.something,
      });

      // Update locally
      setPresents((prev) =>
        prev.map((item) => (item.id === obj.id ? { ...item, ...obj } : item))
      );
    } else {
      // Update on firebase
      toast.promise(updateDocument("gifts", obj), {
        pending: messages.loading.update,
        success: messages.success.update,
        error: messages.error.something,
      });

      // Update locally
      setGifts((prev) =>
        prev.map((item) => (item.id === obj.id ? { ...item, ...obj } : item))
      );
    }
  }

  function CustomNotification({ closeToast }: ToastContentProps) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {messages.button.confirmation}
        <div className="flex w-full gap-2">
          <button
            className="font-bold rounded-lg bg-slate-500 p-2 text-center w-1/2"
            onClick={closeToast}
          >
            {messages.button.cancel}
          </button>
          <button
            className="font-bold rounded-lg bg-red-500 p-2 text-center w-1/2"
            onClick={() => closeToast("delete")}
          >
            {messages.button.delete}
          </button>
        </div>
      </div>
    );
  }

  async function deleteList(list: List) {
    const relatedPresents = presents.filter((p) => p.listId === list.id);
    const relatedGifts = gifts.filter((g) => g.listId === list.id);

    // Delete presents on Firebase
    await Promise.all(
      relatedPresents.map((p) => deleteDocument("presents", p.id as string))
    );
    // Delete gifts on Firebase
    await Promise.all(
      relatedGifts.map((g) => deleteDocument("gifts", g.id as string))
    );

    // Delete locally
    setPresents((prev) => prev.filter((p) => p.listId !== list.id));
    setGifts((prev) => prev.filter((g) => g.listId !== list.id));

    // Delete list on firebase
    await toast.promise(deleteDocument("lists", list.id as string), {
      pending: messages.loading.delete,
      success: messages.success.delete,
      error: messages.error.something,
    });

    // Delete locally
    setUserLists((prev) => prev.filter((item) => item.id !== list.id));
  }

  async function deleteObj(obj: List | Gift | Present) {
    toast(CustomNotification, {
      closeButton: false,
      position: "bottom-center",
      autoClose: false,
      draggable: false,
      onClose(reason) {
        switch (reason) {
          case "delete":
            if ("code" in obj) {
              deleteList(obj);
            } else if ("title" in obj) {
              // Delete on firebase
              toast.promise(deleteDocument("presents", obj.id as string), {
                pending: messages.loading.delete,
                success: messages.success.delete,
                error: messages.error.something,
              });

              // Delete locally
              setPresents((prev) => prev.filter((item) => item.id !== obj.id));
            } else {
              // Delete on firebase
              toast.promise(deleteDocument("gifts", obj.id as string), {
                pending: messages.loading.delete,
                success: messages.success.delete,
                error: messages.error.something,
              });

              // Delete locally
              setGifts((prev) => prev.filter((item) => item.id !== obj.id));
            }
        }
      },
    });
  }

  const value: DataContextType = {
    userLists,
    gifts,
    presents,
    publicList,
    presentsPublicList,
    fetchPublicList,
    addObj,
    updateObj,
    deleteObj,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
