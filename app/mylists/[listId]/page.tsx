"use client";
import Copy from "@/components/Copy";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Photos from "@/components/Photos";
import PresentModal from "@/components/PresentModal";
import { AuthContext } from "@/contexts/authContext";
import { DataContext } from "@/contexts/dataContext";
import Gift from "@/types/Gift";
import Present from "@/types/Present";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ListDetails() {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext must be used within a AuthContextProvider");

  const { user } = authContext;

  const dataContext = useContext(DataContext);
  if (!dataContext)
    throw new Error("DataContext must be used within a DataContextProvider");

  const { userLists, gifts, presents, addObj, updateObj, deleteObj } =
    dataContext;

  const params = useParams();
  const listId = params.listId?.toString() || "";

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(`/signin`);
    }
  }, [user, router]);

  const currentList = useMemo(() => {
    return userLists.find((list) => list.id === listId);
  }, [userLists, listId]);

  const filteredPresents = useMemo(() => {
    return presents?.filter((p) => p.listId === currentList?.id) || [];
  }, [presents, currentList]);

  const filteredGifts = useMemo(() => {
    return gifts?.filter((g) => g.listId === currentList?.id) || [];
  }, [gifts, currentList]);

  const [editingPix, setEditingPix] = useState(false);
  const [pixValue, setPixValue] = useState(currentList?.pix || "");
  const [showPresentModal, setShowPresentModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [currentPresent, setCurrentPresent] = useState<Present>({
    title: "",
    price: 0,
    listId: (currentList?.id as string) ?? "",
    uid: (user?.uid as string) ?? "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handlePixSave = () => {
    if (currentList) {
      if (pixValue.trim() !== "") {
        updateObj({ ...currentList, pix: pixValue });
        setEditingPix(false);
      } else {
        toast.warning("Sua chave pix não pode ser vazia");
      }
    }
  };

  const handleListDelete = () => {
    if (currentList) deleteObj(currentList);
  };

  const openAddModal = () => {
    if (!currentList || !user) return;

    setCurrentPresent({
      title: "",
      price: 0,
      description: "",
      listId: currentList.id as string,
      uid: user.uid,
    });
    setIsEditing(false);
    setShowPresentModal(true);
  };

  const openEditModal = (present: Present) => {
    setCurrentPresent(present);
    setIsEditing(true);
    setShowPresentModal(true);
  };

  useEffect(() => {
    if (listId && !currentList) {
      router.push(`/mylists`);
    }
  }, [currentList, listId, router]);

  return (
    <div className="min-h-screen px-6 py-6 flex flex-col gap-8 items-center justify-between max-w-xl mx-auto">
      <Header />

      <section className="w-full flex justify-between items-center mt-4">
        <Link href="/mylists">
          <BiLeftArrow />
        </Link>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-title font-extrabold">
            {currentList?.title}
          </h1>
          <p className="text-sm text-medium-gray">
            {currentList?.date.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => handleListDelete()}
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
          {editingPix ? (
            <button
              className="text-sm text-golden underline"
              onClick={handlePixSave}
            >
              Salvar
            </button>
          ) : (
            <button
              className="text-sm text-golden underline"
              onClick={() => setEditingPix(true)}
            >
              Editar
            </button>
          )}
        </div>
        {editingPix ? (
          <input
            type="text"
            value={pixValue}
            onChange={(e) => setPixValue(e.target.value)}
            className="text-sm w-full mt-2 border rounded p-2"
          />
        ) : (
          <p className="text-sm text-medium-gray">{currentList?.pix}</p>
        )}
      </section>

      {currentList && <Photos list={currentList} />}

      <section className="w-full bg-yellow-50 p-4 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2">Presentes</h2>
          <button
            className="text-sm text-golden underline"
            onClick={openAddModal}
          >
            Adicionar presente
          </button>
        </div>
        <ul className="space-y-2">
          {filteredPresents.map((present, i) => (
            <li key={i}>
              <div className="flex justify-between items-center">
                <div>
                  <span className="block font-medium">{present.title}</span>
                  <span className="text-xs text-gray-500">
                    {present.description}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1 text-sm">
                  <span>R$ {present.price.toFixed(2)}</span>
                  <button
                    className="text-blue-600 underline"
                    onClick={() => openEditModal(present)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full bg-yellow-50 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Presentes Recebidos</h2>
        <ul className="space-y-2">
          {filteredGifts.length > 0 ? (
            filteredGifts.map((gift, i) => {
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
                    <button
                      className="text-sm text-blue-600 underline"
                      onClick={() => setSelectedGift(gift)}
                    >
                      Ver comprovante
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="text-sm text-gray-500">
              Nenhum presente recebido ainda.
            </li>
          )}
        </ul>
        <p className="mt-4 text-md font-medium">
          Total recebido:{" "}
          <span className="text-golden">
            R${" "}
            {filteredGifts
              .reduce((sum, gift) => {
                const present = presents.find((p) => p.id === gift.presentId);
                return sum + (present?.price ?? 0);
              }, 0)
              .toFixed(2)}
          </span>
        </p>
      </section>

      {showPresentModal && (
        <PresentModal
          isOpen={showPresentModal}
          onClose={() => setShowPresentModal(false)}
          onSave={(present) =>
            isEditing ? updateObj(present) : addObj({ ...present, listId })
          }
          onDelete={
            isEditing
              ? () => {
                  deleteObj(currentPresent);
                  setShowPresentModal(false);
                }
              : undefined
          }
          present={currentPresent}
          setPresent={setCurrentPresent}
          isEditing={isEditing}
        />
      )}

      {selectedGift && (
        <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => {
                  deleteObj(selectedGift);
                  setSelectedGift(null);
                }}
                className="text-red-600 underline"
              >
                <IoTrashOutline className="text-xl" />
              </button>
              <h3 className="text-lg font-bold">Detalhes do Presente</h3>
              <button
                onClick={() => setSelectedGift(null)}
                className="text-blue-600 underline"
              >
                Fechar
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p>
                <strong>Enviado por:</strong> {selectedGift.sentBy}
              </p>
              <p>
                <strong>Enviado em:</strong>{" "}
                {new Date(selectedGift.sentAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Email:</strong> {selectedGift.email}
              </p>
              <p>
                <strong>Telefone:</strong> {selectedGift.phone}
              </p>
            </div>
            <div className="w-full flex justify-center transition-all hover:scale-150">
              <Image
                src={selectedGift.receiptURL}
                alt="Comprovante"
                className="mt-4 rounded-lg h-96 object-contain transition-all hover:scale-200"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
