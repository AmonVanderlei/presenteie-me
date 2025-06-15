import React from "react";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  children,
  maxWidth = "max-w-sm",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div
        className={`bg-white p-6 rounded-xl w-full ${maxWidth} relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
