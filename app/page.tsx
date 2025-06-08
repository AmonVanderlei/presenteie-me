import Footer from "@/components/Footer";
import Link from "next/link";

export default function Main() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 py-6">
      <header className="w-full flex justify-center items-center mb-10">
        <h1 className="text-xl tracking-widest font-title">PRESENTEIE-ME</h1>
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

      <Footer />
    </div>
  );
}
