'use client'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);
  return (
    <header className="w-full flex justify-between items-center mb-10">
      <Link href="/" className="text-xl tracking-widest font-title">
        PRESENTEIE-ME
      </Link>

      <div
        className="flex items-center gap-2 cursor-pointer relative"
        onClick={() => setShowModal(!showModal)}
      >
        <Image
          className="bg-black rounded-full w-10 h-10"
          src="/vercel.svg"
          width={40}
          height={40}
          alt="Profile Picture"
        />
        <p className="text-golden text-sm">User Name</p>

        {showModal && (
          <div
            ref={modalRef}
            className="absolute top-12 right-0 bg-amber-50 border border-light-gray shadow-md rounded-xl p-4 z-50 w-40"
          >
            <button
              onClick={() => console.log("Sair")}
              className="text-sm text-red-600 hover:underline"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
