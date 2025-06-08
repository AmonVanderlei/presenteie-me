import { useState } from "react";
import { MdContentCopy } from "react-icons/md";

type Props = {
  text: string;
  simple?: boolean;
};

export default function Copy({ text, simple }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
