"use client";
import Copy from "@/components/Copy";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type Gift = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const mockGifts: Gift[] = [
  { id: 1, name: "Livro", description: "Um bom livro para ler", price: 50 },
  { id: 2, name: "Camiseta", description: "Estilo e conforto", price: 80 },
  {
    id: 3,
    name: "Fone de ouvido",
    description: "Música de qualidade",
    price: 120,
  },
];

export default function GiftListPage() {
//   const { listCode } = useParams();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const openModal = (gift: Gift) => {
    setSelectedGift(gift);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedGift(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6">
      <Link href="/" className="w-full flex justify-center items-center mb-4">
        <h1 className="text-xl tracking-widest font-title">PRESENTEIE-ME</h1>
      </Link>

      <div className="my-4">
        <h1 className="text-2xl font-title text-center mb-8">Nome da Lista</h1>

        <div className="flex justify-center gap-4 items-center max-w-full overflow-x-clip">
          {[1, 2, 3].map((i, index) => {
            const isCenter = index === 1;
            const rotateClass =
              index === 0 ? "-rotate-12 translate-12" : index === 2 ? "rotate-12 translate-y-12 -translate-x-12" : "";

            return (
              <Image
                key={i}
                src="/vercel.svg"
                alt={`Foto ${i}`}
                className={`${
                  isCenter ? "w-50 h-50 hover:z-12" : "w-36 h-36 z-10"
                } object-cover rounded-xl shadow-md border border-golden hover:scale-125 transition-transform duration-300 ${rotateClass}`}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mx-auto">
        {mockGifts.map((gift) => (
          <button
            key={gift.id}
            onClick={() => openModal(gift)}
            className="min-w-fit border border-golden rounded-xl py-4 px-8 text-left hover:scale-105 transition-transform"
          >
            <h2 className="text-lg font-semibold text-golden">{gift.name}</h2>
            <p className="text-sm text-gray-600">{gift.description}</p>
            <p className="mt-1 font-medium">R$ {gift.price}</p>
          </button>
        ))}
      </div>

      <Footer />

      {isOpen && selectedGift && (
        <div className="fixed inset-0 z-50 bg-black opacity-90 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-title mb-4 text-center">
              {selectedGift.name}
            </h2>

            <p className="text-sm text-gray-700 mb-2 text-center">
              Envie o valor de <strong>R$ {selectedGift.price}</strong> para a
              chave Pix:
            </p>

            <div className="flex justify-between items-center bg-gray-100 text-black py-2 px-4 rounded-lg text-center mb-4">
              chavepix@email.com
              <Copy text="chavepix@email.com" simple={true} />
            </div>

            <form
              className="flex flex-col items-center gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (!previewUrl) return;
                alert("Obrigado pelo presente! 🎁");
                closeModal();
              }}
            >
              <label className="text-sm text-gray-700 font-medium">
                Enviar comprovante:
                <input
                  type="file"
                  accept="image/*"
                  className="block mt-1 text-sm bg-yellow-100 p-2"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    if (file.size > 2 * 1024 * 1024) {
                      setError("O arquivo deve ter no máximo 5MB.");
                      setPreviewUrl(null);
                      return;
                    }

                    setError("");
                    setPreviewUrl(URL.createObjectURL(file));
                  }}
                />
              </label>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Pré-visualização"
                  className="w-40 h-40 object-cover rounded-lg shadow"
                />
              )}

              <button
                type="submit"
                disabled={!previewUrl}
                className={`py-2 px-4 rounded-full transition-all ${
                  previewUrl
                    ? "bg-golden text-white hover:scale-105"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
