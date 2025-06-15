"use client";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  title?: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  message = "Tem certeza que deseja excluir este item?",
  title = "Confirmar exclusão"
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl text-center max-w-xs w-full">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded cursor-pointer hover:scale-105 hover:bg-gray-300 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded cursor-pointer hover:scale-95 transition-all"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
