"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { MdSearch } from "react-icons/md";
import { toast } from "react-toastify";

export default function GiftPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/gift/${code.trim()}`);
    } else {
        toast.info("Digite um código!")
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-6">
      <Link href="/" className="w-full flex justify-center items-center mb-10">
        <h1 className="text-xl tracking-widest font-title">PRESENTEIE-ME</h1>
      </Link>

      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-md text-center">
        <h1 className="text-2xl font-title mb-6">Digite o código da lista</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-4"
        >
          <input
            type="search"
            placeholder="Ex: 1728592390231"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-golden px-4 py-2 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          <button
            type="submit"
            className="flex gap-2 items-center justify-center bg-golden text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition-all"
          >
            <MdSearch className="text-lg"/>
            Buscar lista
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
