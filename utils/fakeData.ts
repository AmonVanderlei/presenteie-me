import Gift from "@/types/Gift";
import List from "@/types/List";
import Present from "@/types/Present";

export const FAKELISTS: List[] = [
  {
    id: "list1",
    code: 123456,
    title: "Chá de Bebê da Ana",
    pix: "ana@email.com",
    date: new Date("2025-07-15"),
    photo1: "https://placehold.co/200x200?text=Ana+1",
    photo2: "https://placehold.co/200x200?text=Ana+2",
    photo3: "https://placehold.co/200x200?text=Ana+3",
    uid: "user123",
  },
  {
    id: "list2",
    code: 654321,
    title: "Aniversário do Pedro",
    pix: "pedro@email.com",
    date: new Date("2025-08-22"),
    photo1: "https://placehold.co/200x200?text=Pedro+3",
    uid: "user123",
  },
];

export const FAKEPRESENTS: Present[] = [
  {
    id: "present1",
    listId: "list1",
    title: "Fralda Pampers RN",
    description: "Pacote com 50 unidades",
    price: 89.9,
    uid: "user123",
  },
  {
    id: "present2",
    listId: "list1",
    title: "Macacão de Algodão",
    description: "Tamanho P - Rosa claro",
    price: 59.0,
    uid: "user123",
  },
  {
    id: "present3",
    listId: "list2",
    title: "Jogo de Lego",
    description: "Lego Star Wars 75300",
    price: 199.99,
    uid: "user123",
  },
];

export const FAKEGIFTS: Gift[] = [
  {
    id: "gift1",
    listId: "list1",
    presentId: "present1",
    sentBy: "Carlos Lima",
    email: "carlos@email.com",
    phone: "(11) 91234-5678",
    receipt: "https://placehold.co/150x100?text=Comprovante+1",
    sentAt: Date.now() - 1000 * 60 * 60 * 24,
    uid: "user123",
  },
  {
    id: "gift2",
    listId: "list2",
    presentId: "present3",
    sentBy: "Marina Souza",
    email: "marina@email.com",
    phone: "(21) 99876-5432",
    receipt: "https://placehold.co/150x100?text=Comprovante+1",
    sentAt: Date.now() - 1000 * 60 * 60 * 12,
    uid: "user123",
  },
];
