"use client";
import Footer from "@/components/Footer";
import { AuthContext } from "@/contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BsGift } from "react-icons/bs";
import { FiCheckSquare } from "react-icons/fi";
import { GrGoogle } from "react-icons/gr";

export default function SignIn() {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw new Error("AuthContext must be used within a AuthContextProvider");

  const { googleLoginHandler } = authContext;

  const router = useRouter();

  const loginHandler = () => {
    googleLoginHandler();
    router.push("/mylists");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-6">
      <Link href="/" className="w-full flex justify-center items-center mb-10">
        <h1 className="text-xl tracking-widest font-title">PRESENTEIE-ME</h1>
      </Link>

      <main className="max-w-11/12 text-center items-center flex flex-col gap-10 mt-6">
        <div className="flex flex-col gap-2 items-center">
          <BsGift className="text-golden text-8xl" />

          <h2 className="text-3xl md:text-4xl font-title font-semibold leading-snug">
            Sua lista de desejos,
            <br />
            sua forma de ser lembrado.
          </h2>

          <p className="text-gray-700">
            Crie sua lista de presentes e receba contribuições com carinho.
          </p>
        </div>

        <div className="flex flex-col w-full items-center justify-center gap-2">
          <button
            onClick={loginHandler}
            className="flex items-center justify-center gap-3 w-2/3 bg-golden text-white py-3 px-6 rounded-md font-medium mt-6 hover:opacity-90 hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <GrGoogle />
            Entrar com Google
          </button>

          <Link
            href="/gift"
            className="border border-golden text-golden w-2/3 py-3 px-6 rounded-md font-medium hover:bg-golden hover:text-white transition-all hover:scale-105"
          >
            Presentear
          </Link>
        </div>

        <ul className="text-left space-y-4">
          <li className="flex items-center gap-2">
            <FiCheckSquare /> Sem complicações
          </li>
          <li className="flex items-center gap-2">
            <FiCheckSquare /> Ideal para qualquer ocasião
          </li>
          <li className="flex items-center gap-2">
            <FiCheckSquare /> Compartilhe com um link
          </li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}
