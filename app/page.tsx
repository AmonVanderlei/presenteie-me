import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Main() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-6">
      <header className="w-full flex justify-between items-center mb-10">
        <Link href="/" className="text-xl tracking-widest font-title">
          PRESENTEIE-ME
        </Link>
        <div className="flex items-center gap-2">
          <Image
            className="bg-black rounded-full w-10 h-10"
            src="/vercel.svg"
            width={40}
            height={40}
            alt="Profile Picture"
          />
          <p className="text-golden text-sm">User Name</p>
        </div>
      </header>

      <main className="max-w-md w-full text-center flex flex-col gap-10 mt-6">
        <h1 className="text-2xl font-title">O que você deseja fazer?</h1>

        <div className="flex flex-col gap-6">
          <Link
            href="/mylists"
            className="bg-golden text-white py-4 px-6 rounded-2xl text-lg font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all"
          >
            Minhas Listas
          </Link>

          <Link
            href="/gift"
            className="border border-golden text-golden py-4 px-6 rounded-2xl text-lg font-medium hover:bg-golden hover:text-white transition-all hover:scale-105"
          >
            Presentear
          </Link>
        </div>
      </main>

      <Footer/>
    </div>
  );
}
