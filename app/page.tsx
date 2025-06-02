import Link from "next/link";
import { BsGift } from "react-icons/bs";
import { FiCheckSquare } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10">
      <header className="w-full flex justify-between items-center mb-10">
        <Link href="/" className="text-xl tracking-widest font-title">
          PRESENTEIE-ME
        </Link>
        <Link
          href="/signin"
          className="border border-golden text-golden px-4 py-1 rounded-full text-sm hover:scale-105 transition-transform duration-200 ease-in-out
"
        >
          Login/Cadastro
        </Link>
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

        <Link
          href="/signin"
          className="w-1/2 bg-golden text-white py-3 px-6 rounded-md font-medium my-6 hover:opacity-90 hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          Criar minha lista
        </Link>

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

      <footer className="w-11/12 mt-20 text-sm text-gray-800 flex gap-4 flex-wrap justify-evenly">
        <a href="https://github.com/AmonVanderlei/presenteie-me" target="_blank">Saiba Mais</a>
        <a href="https://github.com/AmonVanderlei" target="_blank">Feito por Amon Vanderlei</a>
      </footer>
    </div>
  );
}
