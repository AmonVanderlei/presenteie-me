import React, { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import { IoTrashOutline } from "react-icons/io5";
import Present from "@/types/Present";

interface PresentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (present: Present) => void;
  onDelete?: () => void;
  present: Present;
  setPresent: Dispatch<SetStateAction<Present>>;
  isEditing: boolean;
}

export default function PresentModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  present,
  setPresent,
  isEditing,
}: PresentModalProps) {
  const handleSubmit = () => {
    if (!present.title.trim()) return;
    onSave(present);
    onClose();
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="flex justify-between items-center gap-1 mb-4">
        <h3 className="text-lg font-bold">
          {isEditing ? "Editar Presente" : "Adicionar Presente"}
        </h3>
        {isEditing && onDelete && (
          <button
            onClick={() => handleDelete()}
            className="text-red-600 underline"
          >
            <IoTrashOutline className="text-xl" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="text-sm">Nome*</label>
          <input
            placeholder="Digite o nome do presente"
            value={present.title}
            onChange={(e) => setPresent({ ...present, title: e.target.value })}
            className="w-full border p-2 mb-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Preço*</label>
          <input
            type="number"
            min={0}
            step={0.01}
            value={present.price}
            onChange={(e) =>
              setPresent({
                ...present,
                price: e.target.value ? parseFloat(e.target.value) : 0,
              })
            }
            className="w-full border p-2 mb-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Descrição</label>

          <input
            placeholder="Descreva o presente"
            value={present.description}
            onChange={(e) =>
              setPresent({ ...present, description: e.target.value })
            }
            className="w-full border p-2 mb-2 rounded"
          />
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-4 ml-auto">
            <button onClick={onClose} className="text-gray-600">
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="bg-golden text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
