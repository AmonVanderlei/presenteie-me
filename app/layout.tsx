import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "@/contexts/authContext";
import DataContextProvider from "@/contexts/dataContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Presenteie-me",
  description:
    "Crie listas de desejos personalizadas e compartilhe com quem quiser.",
  applicationName: "Presenteie-me",
  authors: [
    { name: "Amon Vanderlei", url: "https://github.com/AmonVanderlei" },
  ],
  creator: "Amon Vanderlei",
  keywords: [
    "Lista de desejos",
    "Presentes",
    "Compartilhar desejos",
    "Lista de casamento",
    "Lista de aniversário",
    "Presentear",
    "Organizador de presentes",
    "Presentes online",
    "Presenteie-me",
  ],
  category: "shopping",
  themeColor: "#cba135",
  colorScheme: "light",
  openGraph: {
    title: "Presenteie-me",
    description:
      "Presenteie-me é um app para criar e compartilhar listas de desejos personalizadas. Ideal para casamentos, aniversários e outras ocasiões especiais.",
    url: "https://presenteie-me.vercel.app/",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "https://presenteie-me.vercel.app/icons/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Presenteie-me - Sua lista de desejos",
      },
    ],
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      {
        rel: "icon",
        sizes: "192x192",
        url: "/icons/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        sizes: "512x512",
        url: "/icons/android-chrome-512x512.png",
      },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover",
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  metadataBase: new URL("https://presenteie-me.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://presenteie-me.vercel.app/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer
          toastClassName="max-w-[90vw] mt-1 mr-2"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
        <AuthContextProvider>
          <DataContextProvider>{children}</DataContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
