"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthContext } from "@/contexts/authContext";
import { DataContext } from "@/contexts/dataContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

export default function MyLists() {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext must be used within a AuthContextProvider");

  const { user } = authContext;

  const dataContext = useContext(DataContext);
  if (!dataContext)
    throw new Error("DataContext must be used within a DataContextProvider");

  const { userLists } = dataContext;

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(`/signin`);
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-6">
      <Header />

      <section className="w-11/12 max-w-md flex flex-col gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold mb-2">Minhas listas</h2>
            <button className=" flex items-center gap-2 bg-golden text-white py-2 px-4 rounded-md w-fit hover:scale-105 transition">
              <FaPlus />
              <p>Nova lista</p>
            </button>
          </div>

          <ul className="flex gap-3 flex-wrap justify-center">
            {userLists.length === 0 ? (
              <p className="text-center text-sm text-gray-500 mt-2">
                Nenhuma lista criada ainda.
              </p>
            ) : (
              <ul className="flex gap-3 flex-wrap justify-center">
                {userLists.map((list) => (
                  <Link
                    href={`/mylists/${list.id}`}
                    key={list.id}
                    className="flex w-full justify-between items-center bg-white p-4 rounded-xl shadow-sm max-w-md"
                  >
                    <div>
                      <h3 className="text-base font-title">{list.title}</h3>
                      <p className="text-sm text-medium-gray">
                        {list.date.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-sm text-golden underline hover:opacity-80">
                      Ver detalhes
                    </div>
                  </Link>
                ))}
              </ul>
            )}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}
