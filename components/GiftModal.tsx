import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Present from "@/types/Present";
import { DataContext } from "@/contexts/dataContext";
import Gift from "@/types/Gift";
import Copy from "./Copy";
import Image from "next/image";

interface GiftModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  present: Present;
  listCode: number;
}

export default function GiftModal({
  setShowModal,
  present,
}: GiftModalProps) {
  const dataContext = useContext(DataContext);
  if (!dataContext)
    throw new Error("DataContext must be used within a DataContextProvider");

  const { publicList, addObj, fileToBase64 } = dataContext;

  const [error, setError] = useState<string>("");
  const [gift, setGift] = useState<Gift>({
    listId: publicList?.id as string,
    presentId: present.id as string,
    sentBy: "",
    email: "",
    phone: "",
    receiptURL: "",
    sentAt: new Date(),
    uid: publicList?.uid as string,
  });

  const handleSubmit = () => {
    setGift({ ...gift, sentAt: new Date() })
    addObj(gift);
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center bg-white rounded-xl max-w-md w-full px-4 py-6 relative gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-title">{present.title}</h2>

        <p className="text-sm text-gray-700">
          Envie ao menos <strong>R$ {present.price}</strong> para a chave Pix:
        </p>

        <div className="w-11/12 flex justify-between items-center bg-gray-100 text-black py-2 px-4 rounded-lg text-center">
          <p>{publicList?.pix}</p>
          <Copy text={publicList?.pix as string} simple={true} />
        </div>

        <form
          className="flex flex-col items-center gap-4 mt-10"
          onSubmit={handleSubmit}
        >
          <label className="w-11/12 text-sm text-gray-700 font-medium">
            Nome
            <input
              placeholder="João da Silva"
              value={gift.sentBy}
              onChange={(e) => setGift({ ...gift, sentBy: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </label>

          <label className="w-11/12 text-sm text-gray-700 font-medium">
            Email
            <input
              placeholder="joaosilva@exemplo.com"
              value={gift.email}
              onChange={(e) => setGift({ ...gift, email: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </label>

          <label className="w-11/12 text-sm text-gray-700 font-medium">
            Telefone
            <input
              placeholder="(00) 00000-0000"
              value={gift.phone}
              onChange={(e) => setGift({ ...gift, phone: e.target.value })}
              className="w-full border p-2 rounded"
              required
            />
          </label>

          <label className="w-11/12 text-sm text-gray-700 font-medium">
            Comprovante
            <input
              type="file"
              accept="image/*"
              className="w-full border border-golden p-2 mb-2 rounded bg-yellow-100"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                if (file.size > 0.72 * 1024 * 1024) {
                  setError("Escolha uma imagem com até 720KB.");
                  return;
                }

                const base64 = await fileToBase64(file);

                setError("");
                setGift({ ...gift, receiptURL: base64 });
              }}
            />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {gift.receiptURL && (
            <Image
              src={gift.receiptURL}
              alt="Pré-visualização"
              width={40}
              height={40}
              className="w-40 h-40 object-cover rounded-lg shadow"
            />
          )}

          <button
            type="submit"
            disabled={
              !gift.receiptURL || !gift.sentBy || !gift.email || !gift.phone
            }
            className={`w-11/12 py-2 px-4 rounded-full transition-all ${
              gift.receiptURL && gift.sentBy && gift.email && gift.phone
                ? "bg-golden text-white hover:scale-105"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
