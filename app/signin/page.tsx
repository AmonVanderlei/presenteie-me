import Footer from "@/components/Footer";
import { BsGift } from "react-icons/bs";
import { FiCheckSquare } from "react-icons/fi";
import { GrGoogle } from "react-icons/gr";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-6">
      <header className="w-full flex justify-between items-center mb-10">
        <h1 className="text-xl tracking-widest font-title">PRESENTEIE-ME</h1>
      </header>

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

        <button className="flex items-center justify-center gap-3 w-2/3 bg-golden text-white py-3 px-6 rounded-md font-medium my-6 hover:opacity-90 hover:scale-105 transition-transform duration-200 ease-in-out">
          <GrGoogle />
          Entrar com Google
        </button>

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
