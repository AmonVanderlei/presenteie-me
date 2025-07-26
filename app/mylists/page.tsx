"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { AuthContext } from "@/contexts/authContext";
import { DataContext } from "@/contexts/dataContext";
import { LIST_MODELS } from "@/utils/listModels";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

export default function MyLists() {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext must be used within a AuthContextProvider");

  const { user } = authContext;

  const dataContext = useContext(DataContext);
  if (!dataContext)
    throw new Error("DataContext must be used within a DataContextProvider");

  const { userLists, addObj } = dataContext;

  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [pix, setPix] = useState("");
  const [template, setTemplate] = useState("Vazia");

  useEffect(() => {
    if (!user) {
      router.push(`/signin`);
    }
  }, [user, router]);

  const handleFormSubmit = async () => {
    if (!title.trim() || !pix.trim() || !eventDate) {
      toast.warning("Por favor, preencha os campos obrigatórios.");
      return;
    }

    const newList = {
      code: Date.now(),
      title: title.trim(),
      date: new Date(eventDate),
      pix: pix.trim(),
      photo1: "",
      photo2: "",
      photo3: "",
      uid: user?.uid as string,
    };

    const listId = await addObj(newList);

    const selectedModel = LIST_MODELS.find((l) => l.model === template);

    if (!selectedModel) {
      toast.error("Modelo de lista inválido.");
      return;
    }
    const listPresents = selectedModel.presents;

    await Promise.all(
      listPresents.map((present) =>
        addObj({ ...present, listId: listId, uid: user?.uid as string })
      )
    );

    setShowModal(false);
    setTitle("");
    setPix("");
    setTemplate("Vazia");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-6">
      <Header />

      <section className="w-11/12 max-w-md flex flex-col gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold mb-2">Minhas listas</h2>
            <button
              onClick={() => setShowModal(true)}
              className=" flex items-center gap-2 bg-golden text-white py-2 px-4 rounded-md w-fit hover:scale-105 transition"
            >
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
                    className="flex justify-between items-center bg-white p-4 gap-2 rounded-xl shadow-sm w-full md:w-md"
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

      {showModal && (
        <div className="fixed inset-0 bg-black z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Criar nova lista</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-sm">Título*</label>
                <input
                  type="text"
                  className="border rounded px-3 py-2"
                  value={title}
                  placeholder="Digite o título do evento"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm">Chave Pix*</label>
                <input
                  type="text"
                  className="border rounded px-3 py-2"
                  value={pix}
                  placeholder="Digite sua chave pix"
                  onChange={(e) => setPix(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm">Data do evento*</label>
                <input
                  type="date"
                  className="border rounded px-3 py-2"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm">Modelo de lista</label>
                <select
                  className="border rounded px-3 py-2"
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                >
                  {LIST_MODELS.map((model) => (
                    <option key={model.model} value={model.model}>
                      {model.model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-sm px-4 py-2 border rounded hover:bg-gray-100 hover:scale-95 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleFormSubmit}
                  className="text-sm px-4 py-2 bg-golden text-white rounded hover:scale-105 transition-all"
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
