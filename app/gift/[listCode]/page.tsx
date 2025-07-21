"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/contexts/dataContext";
import { useParams, useRouter } from "next/navigation";
import Present from "@/types/Present";
import GiftModal from "@/components/GiftModal";

export default function GiftListPage() {
  const dataContext = useContext(DataContext);
  if (!dataContext)
    throw new Error("DataContext must be used within a DataContextProvider");

  const { publicList, presentsPublicList, fetchPublicList } = dataContext;

  const params = useParams();
  const listCode = params.listCode?.toString();
  const [selectedPresent, setSelectedPresent] = useState<Present | null>(null);
  const [showGiftModal, setShowGiftModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (listCode) fetchPublicList(+listCode);
  }, [listCode, fetchPublicList]);

  useEffect(() => {
    if (publicList === undefined) router.push("/gift");
  }, [publicList, router]);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6">
      <Link href="/" className="w-full flex justify-center items-center mb-4">
        <h1 className="text-xl tracking-widest font-title">PRESENTEIE-ME</h1>
      </Link>

      <div className="my-4">
        <h1 className="text-2xl font-title text-center mb-8">
          {publicList?.title}
        </h1>

        <div className="flex justify-center gap-4 items-center max-w-screen overflow-x-clip mb-10">
          {publicList?.photo2 && (
            <img
              src={publicList.photo2}
              width={200}
              height={200}
              alt="Foto 1"
              className="w-36 h-36 z-10 object-cover rounded-xl shadow-md border border-golden hover:scale-125 transition-transform duration-300 -rotate-12 translate-12"
            />
          )}

          {publicList?.photo1 && (
            <img
              src={publicList.photo1}
              width={200}
              height={200}
              alt="Foto 2"
              className="w-50 h-50 hover:z-12 object-cover rounded-xl shadow-md border border-golden hover:scale-125 transition-transform duration-300"
            />
          )}

          {publicList?.photo3 && (
            <img
              src={publicList.photo3}
              width={200}
              height={200}
              alt="Foto 3"
              className="w-36 h-36 z-10 object-cover rounded-xl shadow-md border border-golden hover:scale-125 transition-transform duration-300 rotate-12 translate-y-12 -translate-x-12"
            />
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-5 mx-auto w-[95vw]">
        {presentsPublicList?.length > 0 ? (
          presentsPublicList.map((present) => (
            <button
              key={present.id}
              onClick={() => {
                setSelectedPresent(present);
                setShowGiftModal(true);
              }}
              className="w-1/4 border border-golden rounded-xl py-4 px-5 text-left hover:scale-105 transition-transform"
            >
              <div className="w-full flex flex-col items-center text-xl gap-2">
                <h2 className="text-lg font-bold">{present.title}</h2>
                <p className="text-sm text-gray-600">{present.description}</p>
              </div>
              <div className="w-full flex justify-end text-xl font-bold mt-2 pr-2">
                <p className="font-medium text-golden">R$ {present.price}</p>
              </div>
            </button>
          ))
        ) : (
          <p className="text-golden font-bold">Não há presentes disponíveis!</p>
        )}
      </div>

      <Footer />

      {showGiftModal && selectedPresent && listCode && (
        <GiftModal
          setShowModal={setShowGiftModal}
          present={selectedPresent}
          listCode={+listCode}
        />
      )}
    </div>
  );
}
