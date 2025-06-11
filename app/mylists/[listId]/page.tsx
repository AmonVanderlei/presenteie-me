"use client";
import Copy from "@/components/Copy";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthContext } from "@/contexts/authContext";
import { DataContext } from "@/contexts/dataContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";

export default function ListDetails() {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext must be used within a AuthContextProvider");

  const { user } = authContext;

  const dataContext = useContext(DataContext);
  if (!dataContext)
    throw new Error("DataContext must be used within a DataContextProvider");

  const { userLists, gifts, presents } = dataContext;

  const params = useParams();
  const listId = params.listId?.toString();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(`/signin`);
    }
  }, [user, router]);

  const currentList = useMemo(() => {
    return userLists.find((list) => list.id === listId);
  }, [userLists, listId]);

  const handleDelete = () => {
    setShowDeleteModal(false);
    console.log("Lista deletada:", listId);
  };

  if (!currentList) {
    router.push(`/mylists`);
  }

  return (
    <div className="min-h-screen px-6 py-6 flex flex-col gap-8 items-center justify-between max-w-xl mx-auto">
      <Header />

      <section className="w-full flex justify-between items-center mt-4">
        <Link href="/mylists">
          <BiLeftArrow />
        </Link>
        <h1 className="text-2xl font-title font-extrabold">
          {currentList?.title}
        </h1>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex gap-2 items-center border border-red-500 text-sm text-red-500 px-4 py-2 rounded-full cursor-pointer hover:scale-95 hover:bg-red-500 hover:text-white transition-all"
        >
          <IoTrashOutline className="text-lg" />
        </button>
      </section>

      <Copy
        text={`https://presenteie-me.vercel.app/gift/${currentList?.code}`}
      />

      <section className="w-full bg-yellow-50 p-4 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2">Chave Pix</h2>
          <button className="text-sm text-golden underline hover:opacity-80">
            Editar
          </button>
        </div>
        <p className="text-sm text-medium-gray">
          {currentList?.pix ?? "Não chave pix cadastrada!"}
        </p>
      </section>

      <section className="w-full bg-yellow-50 p-4 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2">Presentes</h2>
          <button className="text-sm text-golden underline">
            Adicionar presente
          </button>
        </div>
        <ul className="space-y-2">
          {presents?.map((present, i) => (
            <li key={i}>
              <div className="flex justify-between">
                <span>{present.title}</span>
                <span>R$ {present.price}</span>
              </div>
              <span className="text-xs text-gray-500">
                {present.description}
              </span>
            </li>
          )) || (
            <li className="text-sm text-gray-500">
              Nenhum presente adicionado ainda.
            </li>
          )}
        </ul>
      </section>

      <section className="w-full bg-yellow-50 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Presentes Recebidos</h2>
        <ul className="space-y-2">
          {gifts?.map((gift, i) => {
            const present = presents.find((p) => p.id === gift.presentId);
            return (
              <li key={i} className="flex justify-between items-center">
                <div>
                  <p>{present?.title ?? "Presente desconhecido"}</p>
                  <p className="text-sm text-gray-500">
                    Enviado por {gift.sentBy}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span>R$ {present?.price?.toFixed(2) ?? "--"}</span>
                  <button className="text-sm text-blue-600 underline mt-1">
                    Ver comprovante
                  </button>
                </div>
              </li>
            );
          }) || (
            <li className="text-sm text-gray-500">
              Nenhum presente recebido ainda.
            </li>
          )}
        </ul>
        <p className="mt-4 text-md font-medium">
          Total recebido:{" "}
          <span className="text-golden">
            R${" "}
            {gifts
              ?.reduce((sum, gift) => {
                const present = presents.find((p) => p.id === gift.presentId);
                return sum + (present?.price ?? 0);
              }, 0)
              .toFixed(2)}
          </span>
        </p>
      </section>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center max-w-xs w-full">
            <p className="mb-4">Tem certeza que deseja excluir esta lista?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded cursor-pointer hover:scale-105 hover:bg-gray-300 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded cursor-pointer hover:scale-95 transition-all"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
