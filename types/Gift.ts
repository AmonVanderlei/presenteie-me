export default interface Gift {
  id?: string;
  listId: string;
  presentId: string;
  sentBy: string;
  email: string;
  phone: string;
  receiptURL: string;
  sentAt: Date;
  uid: string;
}
