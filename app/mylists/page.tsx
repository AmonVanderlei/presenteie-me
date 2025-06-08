"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function MyLists() {
  const [lists, setLists] = useState([
    { id: "1", name: "Aniversário João", date: "20/06/2025" },
    { id: "2", name: "Chá de casa nova", date: "15/07/2025" },
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-6">
      <Header />

      <section className="w-11/12 flex flex-col gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold mb-2">Minhas listas</h2>
            <button className=" flex items-center gap-2 bg-golden text-white py-2 px-4 rounded-md w-fit hover:scale-105 transition">
              <FaPlus />
              <p>Nova lista</p>
            </button>
          </div>

          <ul className="flex gap-3 flex-wrap justify-center">
            {lists.map((list) => (
              <Link
                href={`/mylists/${list.id}`}
                key={list.id}
                className="flex w-full justify-between items-center bg-white p-4 rounded-xl shadow-sm max-w-md"
              >
                <div>
                  <h3 className="text-base font-title">{list.name}</h3>
                  <p className="text-sm text-medium-gray">{list.date}</p>
                </div>
                <div className="text-sm text-golden underline hover:opacity-80">
                  Ver detalhes
                </div>
              </Link>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Chave Pix</h2>
          <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
            <p className="text-sm text-medium-gray">exemplo@pix.com</p>
            <button className="text-sm text-golden underline hover:opacity-80">
              Editar
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
