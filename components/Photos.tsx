"use client";
import { DataContext } from "@/contexts/dataContext";
import List from "@/types/List";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface PhotoProps {
  list: List;
  setZoomedImage: Dispatch<SetStateAction<string | null>>;
}

export default function Photos({ list, setZoomedImage }: PhotoProps) {
  const dataContext = useContext(DataContext);
  if (!dataContext)
    throw new Error("DataContext must be used within a DataContextProvider");

  const { updateObj, fileToBase64 } = dataContext;

  const [error, setError] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [changedPhotos, setChangedPhotos] = useState<{
    photo1: string;
    photo2: string;
    photo3: string;
  }>({
    photo1: "",
    photo2: "",
    photo3: "",
  });

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "photo1" | "photo2" | "photo3"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 0.72 * 1024 * 1024) {
      setError("Escolha uma imagem com até 720KB.");
      return;
    }

    const base64 = await fileToBase64(file);
    setChangedPhotos((prev) => ({ ...prev, [field]: base64 }));
    setError("");
  };

  const handleSave = async () => {
    if (
      changedPhotos.photo1 !== "" ||
      changedPhotos.photo2 !== "" ||
      changedPhotos.photo3 !== ""
    ) {
      const newList: List = {
        ...list,
        photo1:
          changedPhotos.photo1 !== "" ? changedPhotos.photo1 : list.photo1,
        photo2:
          changedPhotos.photo2 !== "" ? changedPhotos.photo2 : list.photo2,
        photo3:
          changedPhotos.photo3 !== "" ? changedPhotos.photo3 : list.photo3,
      };

      await updateObj(newList);
    }
    setEditing(false);
  };

  const renderImage = (
    label: string,
    field: "photo1" | "photo2" | "photo3"
  ) => {
    const current =
      changedPhotos[field] === "" ? list[field] : changedPhotos[field];
    return (
      <div className="bg-gray-300 flex flex-col justify-center items-center p-2 rounded">
        <p className="font-bold mb-2">{label}</p>
        {current ? (
          <button
            onClick={() => setZoomedImage(current)}
            className="relative aspect-square w-full overflow-hidden rounded cursor-zoom-in"
          >
            <Image
              src={current}
              alt={label}
              width={160}
              height={160}
              className="object-cover"
            />
          </button>
        ) : (
          <div className="w-40 h-40 flex items-center justify-center bg-gray-200 text-gray-500 rounded">
            Sem imagem
          </div>
        )}
        {editing && (
          <input
            type="file"
            accept="image/*"
            className="w-full border border-golden p-2 mt-2 rounded bg-yellow-100 max-w-50"
            onChange={(e) => handleImageChange(e, field)}
          />
        )}
      </div>
    );
  };

  return (
    <section className="w-full bg-yellow-50 p-4 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-2">Fotos da lista</h2>
        {editing ? (
          <div className="flex gap-4">
            <button
              className="text-sm text-red-500 underline cursor-pointer"
              onClick={() => {
                setChangedPhotos({
                  photo1: "",
                  photo2: "",
                  photo3: "",
                });
                setEditing(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="text-sm text-golden underline cursor-pointer"
              onClick={handleSave}
            >
              Salvar
            </button>
          </div>
        ) : (
          <button
            className="text-sm text-golden underline"
            onClick={() => setEditing(true)}
          >
            Editar
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex items-center justify-center flex-wrap gap-4 p-4">
        {renderImage("Foto principal", "photo1")}
        {renderImage("Foto 2", "photo2")}
        {renderImage("Foto 3", "photo3")}
      </div>
    </section>
  );
}
