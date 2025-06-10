"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import List from "@/types/List";
import Gift from "@/types/Gift";
import { AuthContext } from "./authContext";
import { FAKELISTS, FAKEGIFTS, FAKEPRESENTS } from "@/utils/fakeData";
import Present from "@/types/Present";

export interface DataContextType {
  userLists: List[];
  publicList: List | null;
  gifts: Gift[];
  presents: Present[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  fetchPublicList: (code: number) => Promise<void>;
  addObj: (obj: List | Gift) => Promise<void>;
  updateObj: (obj: List | Gift) => Promise<void>;
  deleteObj: (obj: List | Gift) => Promise<void>;
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

  const { user } = authContext;

  const [userLists, setUserLists] = useState<List[]>([]);
  const [publicList, setPublicList] = useState<List | null>(null);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [presents, setPresents] = useState<Present[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);

      const userListsData = FAKELISTS.filter((list) => list.uid === user.uid);
      const userGiftsData = FAKEGIFTS.filter((gift) => gift.uid === user.uid);
      const userPresentsData = FAKEPRESENTS.filter(
        (present) => present.uid === user.uid
      );

      setUserLists(userListsData);
      setGifts(userGiftsData);
      setPresents(userPresentsData);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchUserData();
  }, [user, fetchUserData]);

  const fetchPublicList = useCallback(async (code: number) => {
    try {
      setLoading(true);
      const listData = FAKELISTS.find((list) => list.code === code) || null;
      const presentsData = FAKEPRESENTS.filter(
        (present) => present.listId === listData?.id
      );
      
      setPresents(presentsData);
      setPublicList(listData);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, []);

  async function addObj(obj: List | Gift) {
    const newId = Math.random().toString(36).substring(2, 9);
    if ("title" in obj) {
      setUserLists((prev) => [...prev, { ...obj, id: newId } as List]);
    } else {
      setGifts((prev) => [...prev, { ...obj, id: newId } as Gift]);
    }
  }

  async function updateObj(obj: List | Gift) {
    if ("title" in obj)
      setUserLists((prev) =>
        prev.map((item) => (item.id === obj.id ? { ...item, ...obj } : item))
      );
    else
      setGifts((prev) =>
        prev.map((item) => (item.id === obj.id ? { ...item, ...obj } : item))
      );
  }

  async function deleteObj(obj: List | Gift) {
    if ("title" in obj)
      setUserLists((prev) => prev.filter((item) => item.id !== obj.id));
    else setGifts((prev) => prev.filter((item) => item.id !== obj.id));
  }

  const value: DataContextType = {
    userLists,
    publicList,
    gifts,
    presents,
    loading,
    setLoading,
    fetchPublicList,
    addObj,
    updateObj,
    deleteObj,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
