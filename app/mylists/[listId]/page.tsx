"use client";
import Copy from "@/components/Copy";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";

export default function ListDetails() {
  const params = useParams();
  const listId = params.listId?.toString();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(false);
    console.log("Lista deletada:", listId);
  };

  return (
    <div className="min-h-screen px-6 py-6 flex flex-col gap-8 items-center justify-between max-w-xl mx-auto">
      <Header />

      <section className="w-full flex justify-between items-center mt-4">
        <Link href="/mylists">
          <BiLeftArrow />
        </Link>
        <h1 className="text-2xl font-title font-extrabold">Minha Lista</h1>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex gap-2 items-center border border-red-500 text-sm text-red-500 px-4 py-2 rounded-full cursor-pointer hover:scale-95 hover:bg-red-500 hover:text-white transition-all"
        >
          <IoTrashOutline className="text-lg" />
        </button>
      </section>

      <Copy
        listId={listId}
        text={`https://presenteie-me.vercel.app/gift?id=${listId}`}
      />

      <section className="w-full bg-yellow-50 p-4 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2">Presentes</h2>
          <button className="text-sm text-golden underline">
            Adicionar presente
          </button>
        </div>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Livro</span>
            <span>R$ 50</span>
          </li>
          <li className="flex justify-between">
            <span>Camiseta</span>
            <span>R$ 80</span>
          </li>
          <li className="flex justify-between">
            <span>Caneca</span>
            <span>R$ 30</span>
          </li>
        </ul>
      </section>

      <section className="w-full bg-yellow-50 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Presentes Recebidos</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Camiseta</span>
            <button className="text-sm text-blue-600 underline">
              Ver comprovante
            </button>
          </li>
        </ul>
        <p className="mt-4 text-md font-medium">
          Total recebido: <span className="text-golden">R$ 80</span>
        </p>
      </section>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl text-center max-w-xs w-full">
            <p className="mb-4">Tem certeza que deseja deletar esta lista?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm bg-light-gray rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded"
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
