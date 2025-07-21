import { useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {
  text: string;
  simple?: boolean;
};

export default function Copy({ text, simple }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const successful = document.execCommand("copy");
        if (!successful) throw new Error("Fallback failed");

        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Seu navegador não suporta a cópia automática. Copie manualmente.");
    }
  };
  return (
    <>
      {simple ? (
        <button
          onClick={handleCopy}
          className="text-golden px-4 py-2 rounded-full cursor-pointer hover:bg-yellow-700 hover:scale-105 transition-all"
        >
          <MdContentCopy />
        </button>
      ) : (
        <button
          onClick={handleCopy}
          className="w-full flex gap-2 items-center justify-center border border-golden text-golden px-4 py-2 rounded-full cursor-pointer hover:bg-yellow-700 hover:scale-105 transition-all"
        >
          {copied ? (
            "Copiado!"
          ) : (
            <>
              Copiar <MdContentCopy />
            </>
          )}
        </button>
      )}
    </>
  );
}
